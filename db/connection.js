const dbConfig = require("../knexfile");

const connection = require("knex");

module.exports = connection(dbConfig);
