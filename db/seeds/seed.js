const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);
      const usersInsertions = knex("users").insert(userData);

      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      /* 
      comments.belongs_to = article.title needs to be article_id
      comments.created_by = author(users.username)
      */
      const formattedDates = formatDates(articleData);
      return knex("articles").insert(formattedDates).returning("*");
    })
    .then((articleRows) => {
      const articleRef = makeRefObj(articleRows, "title", "article_id");
      const formattedComments = formatComments(
        commentData,
        articleRef,
        "belongs_to",
        "article_id"
      );
      const formattedCommentsAndDates = formatDates(formattedComments);
      return knex("comments").insert(formattedCommentsAndDates).returning("*");
    });
};
