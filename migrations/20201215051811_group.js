exports.up = function (knex) {
  return knex.schema.createTable("group", function (table) {
    table.increment("group_id").primary().unique();
    table.string("group_name").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("status");
  });
};
