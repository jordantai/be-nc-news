const articlesRouter = require("express").Router();
const {
  getArticleByArticleId,
  patchArticleById,
} = require("../controllers/articles.controller");
const {
  postCommentByArticleId,
  getCommentsByArticleId,
} = require("../controllers/comments.controller");
const { send405 } = require("../errors");

articlesRouter.route("/").all(send405);
articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleId)
  .patch(patchArticleById)
  .all(send405);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(send405);

module.exports = articlesRouter;
