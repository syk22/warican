exports.up = function (knex) {
  return knex.schema.createTable("merchant", function (table) {
    table.increments("merchant_id").primary().unique();
    table.string("restaurant_id").notNullable();
    table.string("restaurant_name").unique().notNullable();
    table.json("restaurant_menu");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("status");
  });
};

exports.down = function (knex) {
  return knex.schema.hasTable("merchant").then(function(exists) {
    if (exists) {
      return knex.schema.dropTable("merchant");
    }
  });
};
