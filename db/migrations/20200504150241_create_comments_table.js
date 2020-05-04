exports.up = function (knex) {
  console.log("Creating comments table...");
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.integer("comment_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("create_at", { useTz: true });
    commentsTable.text("comments").notNullable();
  });
};

exports.down = function (knex) {
  console.log("Removing comments table...");
  return knex.schema.dropTable("comments");
};
