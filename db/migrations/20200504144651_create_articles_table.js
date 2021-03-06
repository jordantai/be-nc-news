exports.up = function (knex) {
  console.log("Creating articles table...");
  return knex.schema.createTable("articles", (articlesTable) => {
    articlesTable.increments("article_id").primary();
    articlesTable.text("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author").references("users.username");
    articlesTable.timestamp("created_at", { useTz: true });
  });
};

exports.down = function (knex) {
  console.log("Removing articles table...");
  return knex.schema.dropTable("articles");
};
