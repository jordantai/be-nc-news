const commentsRouter = require("express").Router();
const { patchCommentById } = require("../controllers/comments.controller");
const { send405 } = require("../errors");

commentsRouter.route("/").all(send405);
commentsRouter.route("/:comment_id").patch(patchCommentById);

module.exports = commentsRouter;
