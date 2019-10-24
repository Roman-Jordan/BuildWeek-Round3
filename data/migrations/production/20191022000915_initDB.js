exports.up = function(knex) {
  return knex.schema
    .createTable("user_roles", col => {
      col.increments();
      col
        .string("role")
        .unique()
        .notNullable();
    })
    .createTable("users", col => {
      col.increments();
      col
        .string("username", 50)
        .unique()
        .notNullable();
      col.string("password", 200).notNullable();
      col
        .string("email")
        .unique()
        .notNullable();
      col
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("user_roles")
        .notNullable()
    });
};

exports.down = function(knex) {
  return knex.schema

    .dropTableIfExists("users")

    .dropTableIfExists("user_roles");
};
