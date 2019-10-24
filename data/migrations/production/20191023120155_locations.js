exports.up = function(knex) {
    return knex.schema.createTable("us_location_data", col => {
      col.increments().primary();
      col.string("zip", 5).notNullable().index();
      col.text("zipType", 1).notNullable();
      col.string("city", 30).notNullable();
      col.string("county", 50).notNullable();
      col.string("state", 50).notNullable();
      col.string("stateAbbr", 2).notNullable();
      col.string("areaCode",20).notNullable();
      col.string("TimeZone", 50).notNullable();
      col.integer("UTC", 2).notNullable();
      col.text("DST", 1).notNullable();
      col.float("latitude", 14, 10).notNullable();
      col.float("longitude", 14, 10).notNullable();
    });
  };
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("us_location_data");
  };
  