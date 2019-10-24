exports.up = function(knex) {
  return knex.schema
    .createTable("customers", col => {
      col.increments();
      col
        .string("customer_name")
        .unique()
        .notNullable();
      col.string("image");
      col.float("latitude", 14, 10).notNullable();
      col.float("longitude", 14, 10).notNullable();
      col
        .integer("user_id")
        .unique()
        .references("id")
        .inTable("users")
        .notNullable();
    })
    .createTable("reviews", col => {
      col.increments();
      col.string("description", 255).notNullable();
      col.string("image");
      col.integer("rating", 1);
      col
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers");
    })
    .createTable("customer_company_reviews", col => {
      col.increments();
      col
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers");
      col
        .integer("review_id")
        .unsigned()
        .references("id")
        .inTable("reviews");
    })
    .createTable("customer_menu_item_reviews", col => {
      col.increments();
      col
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers");
      col
        .integer("review_id")
        .unsigned()
        .references("id")
        .inTable("reviews");
      col
        .integer("item_id")
        .unsigned()
        .references("id")
        .inTable("menu_items");
    })
    .createTable("customer_truck_reviews", col => {
      col.increments();
      col
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers");
      col
        .integer("review_id")
        .unsigned()
        .references("id")
        .inTable("reviews");
      col
        .integer("truck_id")
        .unsigned()
        .references("id")
        .inTable("trucks");
    })
    .createTable("customer_favorites", col => {
      col.increments();
      col
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers");
      col
        .integer("truck_id")
        .unsigned()
        .references("id")
        .inTable("trucks");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("customer_company_reviews")
    .dropTableIfExists("customer_menu_item_reviews")
    .dropTableIfExists("customer_truck_reviews")
    .dropTableIfExists("customer_favorites")
    .dropTableIfExists("reviews")
    .dropTableIfExists("customers");
};
