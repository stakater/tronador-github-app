const nunjucks = require('nunjucks');
const yaml = require('js-yaml');
const k8s = require('@kubernetes/client-node');
try {
    // 1. render CR template
    const source = `
apiVersion: tronador.stakater.com/v1alpha1
kind: TestEnvConfig
metadata:
  name: {{ name }}
spec:
  target_branch: {{ branch }}
  {{ spec  | indent(2) }}
`;
    crname = "test-cr";
    branch = "master";
    spec = `
application:
  chart_path: .helm/chart/frontend
  chart_vars_repo_path: stakater/helm-charts@master:releases/frontend/feature.yaml
  value_overrides:
    - "some.value=foobar"
`;
    nunjucks.configure({ autoescape: false });
    const contents = nunjucks.renderString(source, { name: crname, branch: branch, spec: spec });


    // 2. create CR on k8s cluster
    crBody = yaml.load(contents);
    console.log(crBody);

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    console.log(kc.currentContext);
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    const customObjectsApi = kc.makeApiClient(k8s.CustomObjectsApi)

    var namespace = {
        metadata: {
            name: 'test',
        },
    };
    
    k8sApi.createNamespace(namespace).then(
        (response) => {
            console.log('Created namespace');
            console.log(response);
        },
        (err) => {
            console.log('Error!: ' + err);
        },
    );


    customObjectsApi.createClusterCustomObject(
        group="tronador.stakater.com",
        version="v1alpha1",
        plural="testenvconfigs",
        body=crBody
    ).then(
        (response) => {
            console.log('Created testenvconfig CR');
            console.log(response);
        },
        (err) => {
            console.log('Error!: ' + err);
        },
    );
} catch (e) {
    console.log(e);
}