exports.up = function (knex) {
    return knex.schema.createTable("transaction_history", function (table) {
      table.increment("transaction_id").primary().unique();
      table.float("payment_amount")
      table.string("payment_status")
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