const apiRouter = require("express").Router();
const {
  topicRouter,
  articleRouter,
  commentRouter,
  userRouter,
  loggerRouter
} = require("./index");

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/logLevel", loggerRouter);
module.exports = apiRouter;
