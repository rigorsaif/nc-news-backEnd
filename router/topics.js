const topicRouter = require("express").Router();
const {
  getAllTopics,
  getAlltheArticlesBySlug
} = require("../controller/index");

topicRouter.route("/").get(getAllTopics);
topicRouter.route("/:topic_slug/articles").get(getAlltheArticlesBySlug);
module.exports = topicRouter;
