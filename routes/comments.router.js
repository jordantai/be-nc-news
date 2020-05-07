const commentsRouter = require("express").Router();
// const {
//   getCommentsByArticleId,
// } = require("../controllers/comments.controller");
// const { send405 } = require("../errors");

// commentsRouter.route("/").all(send405);
// commentsRouter
//   .route("/:article_id/comments")
//   .get(getCommentsByArticleId)

module.exports = commentsRouter;
