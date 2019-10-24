exports.up = function(knex) {
  return knex.schema
    .createTable("owners", col => {
      col.increments();
      col
        .string("company_name")
        .unique()
        .notNullable();
      col.string("image");
      col
        .integer("user_id")
        .unique()
        .references('id')
        .inTable('users')
        .notNullable();
    })

    .createTable("trucks", col => {
      col.increments();
      col.string("name").unique();
      col.float("latitude", 14, 10);
      col.float("longitude", 14, 10);
      col.string("image");
      col.boolean("active");
      col
        .integer("owner_id")
        .index()
        .references("id")
        .inTable("owners");
    })

    .createTable("menus", col => {
      col.increments();
      col.string("menu_name");
    })

    .createTable("menu_items", col => {
      col.increments();
      col.string("item_name", 50);
      col.string("item_description", 255);
      col.string("image");
      col.decimal("price", 10, 2);
      col
        .integer("menu")
        .index()
        .references("id")
        .inTable("menus")
        .notNullable();
    })

    .createTable("truck_menus", col => {
      col.increments();
      col
        .integer("truck_id")
        .unsigned()
        .references("id")
        .inTable("trucks");
      col
        .integer("menu_id")
        .unsigned()
        .references("id")
        .inTable("menus");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("truck_menus")
    .dropTableIfExists("menu_items")
    .dropTableIfExists("menus")
    .dropTableIfExists("truck_menus")
    .dropTableIfExists("trucks")
    .dropTableIfExists("owners");
};
