const apiRouter = require("express").Router();
const {
  topicRouter,
  articleRouter,
  commentRouter,
  userRouter
} = require("./index");

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);
module.exports = apiRouter;
