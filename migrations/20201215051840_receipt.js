exports.up = function (knex) {
  return knex.schema.createTable("receipt", function (table) {
    table.increment("receipt_id").primary().unique();
    table.json("order")
    table.float("balance")
    table.string("payment_status")
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("restaurant_id")
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