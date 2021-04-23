const k8s = require('@kubernetes/client-node');

async function createTronadorCR (configObj) {
  const tronadorCR = generateCRManifest(configObj)
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  // const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  const customObjectsApi = kc.makeApiClient(k8s.CustomObjectsApi)

  customObjectsApi.createClusterCustomObject(
    group="tronador.stakater.com",
    version="v1alpha1",
    plural="testenvconfigs",
    body=tronadorCR
  ).then(
    (response) => {
      console.log('Created testenvconfig CR');
      console.log(response);
    },
    (err) => {
      console.log('Error!: ' + err);
    },
  );
}

async function generateCRManifest(configObj){
  branch = context.getPullRequestBranch(ctx);

  const tronadorCR = {
    "apiVersion": "tronador.stakater.com/v1alpha1",
    "kind": "TestEnvConfig",
    "metadata": {
      "name": "",
    },
  }
  tronadorCR["metadata"]["name"] = ""
  tronadorCR["spec"] = configObj
  return tronadorCR
}

module.exports = {
  createTronadorCR: createTronadorCR
}
