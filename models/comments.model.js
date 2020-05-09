const connection = require("../db/connection");

exports.addCommentByArticleId = (username, body, article_id) => {
  if (!body) return Promise.reject({ status: 400, msg: "Bad request" });
  const date = new Date();
  return connection("comments")
    .insert({ author: username, body, article_id, created_at: date })
    .returning("*")
    .then((comment) => {
      return comment[0];
    });
};

exports.fetchCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .then((comments) => {
      return comments;
    });
};
