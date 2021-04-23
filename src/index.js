/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const PullRequestOpend = require('./webhooks/pull-request-opened')
const PullRequestSynced = require('./webhooks/pull-request-synchronized')

module.exports = (app) => {

  app.log.info("Yay, the app was loaded!");

  app.on("pull_request.opened", async (ctx) => {
    await PullRequestOpend.handle(app, ctx)
  });

  app.on("pull_request.synchronize", async (ctx) => {
    await PullRequestSynced.handle(app, ctx)
  });

  //Note(Jose): recommend Sentry logging

};
