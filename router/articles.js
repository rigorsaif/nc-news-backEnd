const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticle,
  patchArticleVotes,
  getArticleByUserId
} = require("../controller/index");
const articleRouter = require("express").Router();

articleRouter.route("/").get(getAllArticles);

articleRouter
  .route("/:_id")
  .get(getArticleById)
  .patch(patchArticleVotes);

articleRouter
  .route("/users/:_id")
  .get(getArticleByUserId);

articleRouter
  .route("/:_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticle);

module.exports = articleRouter;
