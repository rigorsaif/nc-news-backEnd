const loggerRouter = require("express").Router()
const { changeLogLevel} = require("../controller/index")

loggerRouter.route("/").get(changeLogLevel);

module.exports = loggerRouter