exports.up = function (knex) {
  return knex.schema.createTable("customer", function (table) {
    table.increment("customer_id").primary().unique();
    table.string("user_name").unique().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("status");
  });
};
