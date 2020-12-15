exports.up = function (knex) {
  return knex.schema.createTable("receipt", function (table) {
    table.increments("receipt_id").primary().unique();
    table.json("order");
    table.float("balance");
    table.string("payment_status");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .bigInteger("restaurant_id")
      .notNullable()
      .references("restaurant_id")
      .inTable("restaurant");
    table
      .integer("group_id")
      .notNullable()
      .references("group_id")
      .inTable("group");
  });
};

exports.down = function (knex) {
  return knex.schema.hasTable("receipt").then(function (exists) {
    if (exists) {
      return knex.schema.dropTable("receipt");
    }
  });
};
