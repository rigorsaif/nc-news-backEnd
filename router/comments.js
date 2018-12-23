const commentRouter = require("express").Router();
const {
  deleteComment,
  voteUpComments,
  getCommentsByUserId
} = require("../controller/index");

commentRouter
  .route("/:_id")
  .patch(voteUpComments)
  .delete(deleteComment);

commentRouter.route("/users/:_id").get(getCommentsByUserId);

module.exports = commentRouter;
