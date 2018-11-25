const userRouter = require("express").Router();
const { getUsersByUsername, getAllUsers } = require("../controller/index");

userRouter.route("/").get(getAllUsers);

userRouter.route("/:username").get(getUsersByUsername);

module.exports = userRouter;
