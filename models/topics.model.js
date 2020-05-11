const connection = require("../db/connection");

exports.fetchTopics = () => {
  return connection.select("*").from("topics").orderBy("slug");
};

exports.fetchTopicBySlug = (slug) => {
  return connection
    .select("*")
    .from("topics")
    .where("slug", slug)
    .then((topic) => {
      if (topic.length === 0)
        return Promise.reject({ status: 404, msg: "Topic not found" });
      return topic[0];
    });
};
