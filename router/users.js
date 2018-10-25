const userRouter = require("express").Router();
const { getUsersByUsername } = require("../controller/index");

userRouter.route("/:username").get(getUsersByUsername);
module.exports = userRouter;
