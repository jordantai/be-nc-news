const articlesRouter = require("express").Router();
const {
  getArticleByArticleId,
  patchArticleById,
} = require("../controllers/articles.controller");
const { send405 } = require("../errors");

articlesRouter.route("/").all(send405);
articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleId)
  .patch(patchArticleById);

module.exports = articlesRouter;
