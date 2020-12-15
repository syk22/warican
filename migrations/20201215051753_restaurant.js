exports.up = function (knex) {
  return knex.schema.createTable("restaurant", function (table) {
    table.primary("restaurant_id").unique();
    table.string("restaurant_name").unique().notNullable();
    table.json("restaurant_menu");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("status");
  });
};

// exports.down = function (knex) {};
