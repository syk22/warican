exports.up = function (knex) {
  return knex.schema.createTable("transaction_history", function (table) {
    table.increments("transaction_id").primary().unique();
    table.string("payment_currency");
    table.float("payment_amount");
    table.string("payment_string");
    table.string("payment_status");
    table.timestamp("status_updated_at").defaultTo(knex.fn.now());
    table
      .integer("customer_id")
      .notNullable()
      .references("customer_id")
      .inTable("customer");
    table
      .integer("receipt_id")
      .notNullable()
      .references("receipt_id")
      .inTable("receipt");
  });
};

exports.down = function (knex) {
  return knex.schema.hasTable("transaction_history").then(function (exists) {
    if (exists) {
      return knex.schema.dropTable("transaction_history");
    }
  });
};
