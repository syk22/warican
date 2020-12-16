exports.up = function (knex) {
  return knex.schema.createTable("receipt", function (table) {
    table.increments("receipt_id").primary().unique();
    table.json("order");
    table.string("currency");
    table.float("balance");
    table.string("balance_string");
    table.string("payment_status");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("merchant_id")
      .notNullable()
      .references("merchant_id")
      .inTable("merchant");
    table
      .integer("group_id")
      .notNullable()
      .references("group_id")
      .inTable("groups");
  });
};

exports.down = function (knex) {
  return knex.schema.hasTable("receipt").then(function (exists) {
    if (exists) {
      return knex.schema.dropTable("receipt");
    }
  });
};
