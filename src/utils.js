const nunjucks = require('nunjucks');
const yaml = require('js-yaml');

// Input: YAML string
// Output: JSON Object
async function yamlString2JsonObject (data) {
  // 1. Render YAML template
  // nunjucks.configure({ autoescape: false });
  // const contents = nunjucks.renderString(template, params);
  // 2. Convert YAML text to JSON Object
  return yaml.load(data);
}

module.exports = {
  yamlString2JsonObject: yamlString2JsonObject
}
