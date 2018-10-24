const apiRouter = require("express").Router();
const { topicRouter } = require("./index");

apiRouter.use("/topics", topicRouter);

module.exports = apiRouter;
