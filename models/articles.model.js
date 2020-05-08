const connection = require("../db/connection");

exports.fetchArticleByArticleId = (article_id) => {
  return connection
    .select("articles.*")
    .count("comments.article_id", { as: "comment_count" })
    .from("articles")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .then((article) => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "Article not found" });
      return article[0];
    });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  if (!inc_votes) return Promise.reject({ status: 400, msg: "Bad request" });
  return connection("articles")
    .increment("votes", inc_votes)
    .where("article_id", article_id)
    .returning("*")
    .then((article) => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "Article not found" });
      return article[0];
    });
};
