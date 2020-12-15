exports.up = function (knex) {
  return knex.schema.createTable("customer", function (table) {
    table.increments("customer_id").primary().unique();
    table.string("user_name").unique().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("status");
  });
};

exports.down = function (knex) {
  return knex.schema.hasTable("customer").then(function (exists) {
    if (exists) {
      return knex.schema.dropTable("customer");
    }
  });
};