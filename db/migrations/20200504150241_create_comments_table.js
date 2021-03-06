exports.up = function (knex) {
  console.log("Creating comments table...");
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username").notNullable();
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at", { useTz: true }).notNullable();
    commentsTable.text("body").notNullable();
  });
};

exports.down = function (knex) {
  console.log("Removing comments table...");
  return knex.schema.dropTable("comments");
};
