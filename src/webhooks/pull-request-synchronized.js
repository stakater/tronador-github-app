async function handle (app, ctx) {
  const github = await app.auth(); // Not passing an id returns a JWT-authenticated client
  const token = await github.apps.createInstallationAccessToken({ 
      installation_id: ctx.payload.installation.id,
      repository_ids: [ctx.payload.repository.id],
  });
  app.log.info(token.data.token);

  // 2. Get config file
  const path = ".env.example"
  config = await ctx.octokit.repos.getContent({
    owner: ctx.payload.repository.owner.login,
    repo: ctx.payload.repository.name,
    path: path,
  });
  app.log.info(config.data.content);

  // 3. validate tronador yaml syntax

  // 4. Create a tronador CR
  params = ctx.issue({body: "TE created. Link is ..."});
  return ctx.octokit.issues.createComment(params);
}

module.exports = {
  handle: handle
}