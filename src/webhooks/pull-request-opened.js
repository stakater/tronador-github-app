const github = require('./../k8s')
const config = require('./../config');
const k8s = require('./../k8s');

async function handle (app, ctx) {
  try {
    
    // 1. Get config file
    const configObj = config.get(ctx)
    app.log.info(configObj);
    if (!config.validate(configObj)) {
      return github.createComment("config syntax invalid")
    }
    // 2. filter branch
    if (!config.checkBranch(ctx, configObj)) {
      return
    }
    // 3. Get access token
    const token = github.getAccessToken(app, ctx)
    app.log.info(token);
    // 4. Create a tronador CR
    k8s.createTronadorCR(configObj)

    return github.createComment("TE created. Link is ...")
  } catch (error) {
    return github.createComment("Internal error. Contact to the admin.")
  }
}

module.exports = {
  handle: handle
}