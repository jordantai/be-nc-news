const {
  addCommentByArticleId,
  fetchCommentsByArticleId,
  updateCommentVotes,
  removeCommentById,
} = require("../models/comments.model");
const { fetchArticleByArticleId} = require("../models/articles.model");

exports.postCommentByArticleId = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  addCommentByArticleId(username, body, article_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  const queries = [fetchCommentsByArticleId(article_id, sort_by, order)];
  if(article_id) queries.push(fetchArticleByArticleId(article_id));
  // fetchCommentsByArticleId(article_id, sort_by, order)
  Promise.all(queries)
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentVotes(comment_id, inc_votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
