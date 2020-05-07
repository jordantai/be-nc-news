const articlesRouter = require("express").Router();
const {
  getArticleByArticleId,
  patchArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/articles.controller");
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
  .post(postCommentByArticleId);

module.exports = articlesRouter;
