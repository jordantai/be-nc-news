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

exports.updateCommentVotes = (comment_id, inc_votes) => {
  if (!inc_votes) return Promise.reject({ status: 400, msg: "Bad request" });
  return connection("comments")
    .increment("votes", inc_votes)
    .where("comment_id", comment_id)
    .returning("*")
    .then((comment) => {
      if (comment.length === 0)
        return Promise.reject({ status: 404, msg: "Comment not found" });
      return comment[0];
    });
};
