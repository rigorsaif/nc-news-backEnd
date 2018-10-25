const topicRouter = require("express").Router();
const {
  getAllTopics,
  getAllArticlesBySlug,
  postArticleBySlug
} = require("../controller/index");

topicRouter.route("/").get(getAllTopics);
topicRouter
  .route("/:slug/articles")
  .get(getAllArticlesBySlug)
  .post(postArticleBySlug);

module.exports = topicRouter;
