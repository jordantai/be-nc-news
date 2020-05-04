exports.up = function (knex) {
  console.log("Creating users table...");
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username", 255).primary().unique();
    usersTable.text("avatar_url");
    usersTable.string("name");
  });
};

exports.down = function (knex) {
  console.log("Removing users table...");
  return knex.schema.dropTable("users");
};
