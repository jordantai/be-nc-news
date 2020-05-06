const connection = require("../db/connection");

exports.fetchArticleByArticleId = (article_id) => {
  return connection
    .select("articles.*")
    .count("comments.article_id", { as: "comment_count" })
    .from("articles")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .then((rows) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "User not found" });
      return rows;
    });
};
