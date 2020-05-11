const commentsRouter = require("express").Router();
const {
  patchCommentById,
  deleteCommentById,
} = require("../controllers/comments.controller");
const { send405 } = require("../errors");

commentsRouter.route("/").all(send405);
commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(send405);

module.exports = commentsRouter;
