const commentRouter = require("express").Router();
const { deleteComment, voteUpComments } = require("../controller/index");

commentRouter
  .route("/:_id")
  .patch(voteUpComments)
  .delete(deleteComment)

module.exports = commentRouter;
