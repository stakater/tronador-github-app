const context = require('./context')
const utils = require('./utils')

// return JSON Object of .tronador.yaml file in the repo
async function get (ctx) {
  const path = ".env.example"
  config = await ctx.octokit.repos.getContent({
    owner: context.getRepoOwnerLogin(ctx),
    repo: context.getRepoName(ctx),
    path: path,
  });
  return utils.yamlString2JsonObject(config.data.content)
}

// Reserved yet
async function validate (configObj) {
  console.log(configObj)
  // 0. Check json template based on $SCHEMA
  // 1. check if target_branches is array once exists
  // 2. etc
  return true
}

// Check if the current branch is included in target_branches list of .tronador.yaml
async function checkBranch(ctx, configObj){
  
  const currentBranch = context.getPullRequestBranch(ctx)
  
  if ( !configObj.hasOwnProperty("target_branches") ) {
    return true
  }

  if (tronadorConfig["target_branches"].includes(currentBranch)) {
    return true
  }

  return false

}


module.exports = {
  get: get,
  checkBranch: checkBranch,
  validate: validate,
}
