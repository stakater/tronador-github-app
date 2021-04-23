const context = require('./context')

async function getAccessToken (app, ctx) {
  const github = await app.auth();
  const token = await github.apps.createInstallationAccessToken({ 
    installation_id: context.getInstallationId(ctx),
    repository_ids: context.getRepositoryId(ctx),
  });
  return token.data.token
}

async function createComment (ctx, comment) {
  params = ctx.issue({body: comment});
  return ctx.octokit.issues.createComment(params);
}

module.exports = {
  createComment: createComment,
  getAccessToken: getAccessToken
}
