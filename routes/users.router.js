const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users.controller");
const { send405 } = require("../errors");

usersRouter.route("/").all(send405);
usersRouter.route("/:username").get(getUserByUsername).all(send405);

module.exports = usersRouter;
