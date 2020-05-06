const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users.controller");
const { handle405s } = require("../errors");

usersRouter.route("/").all(handle405s);
usersRouter.route("/:username").get(getUserByUsername);

module.exports = usersRouter;
