exports.up = function(knex) {
  return knex.schema
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
    })
    .createTable("roles", col => {
      col.increments();
      col
        .string("role")
        .unique()
        .notNullable();
    })
    .createTable("user_roles", col => {
      col.increments();
      col
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      col
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles");
      col.unique(['user_id','role_id'])
    })
};

exports.down = function(knex) {

    return knex.schema
    .dropTableIfExists('user_roles')
    .dropTableIfExists('roles')
    .dropTableIfExists('users')

};
