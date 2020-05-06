const articlesRouter = require("express").Router();
const { getArticleByArticleId } = require("../controllers/articles.controller");
const { handle405s } = require("../errors");

articlesRouter.route("/").all(handle405s);
articlesRouter.route("/:article_id").get(getArticleByArticleId);

module.exports = articlesRouter;
