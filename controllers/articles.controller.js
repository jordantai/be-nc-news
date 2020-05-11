const {
  fetchArticleByArticleId,
  updateArticleVotes,
  fetchArticles,
} = require("../models/articles.model");
const { fetchTopicBySlug } = require("../models/topics.model");
const { fetchUserByUsername } = require("../models/users.model");

exports.getArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleId(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  const queries = [fetchArticles(sort_by, order, author, topic)];
  if (topic) queries.push(fetchTopicBySlug(topic));
  if (author) queries.push(fetchUserByUsername(author));
  Promise.all(queries)
    .then(([articles]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
