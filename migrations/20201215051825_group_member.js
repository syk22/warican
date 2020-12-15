exports.up = function (knex) {
  return knex.schema.createTable("group_member", function (table) {
    table.increments("group_member_id").primary().unique();
    table
      .integer("group_id")
      .notNullable()
      .references("group_id")
      .inTable("group")
      .onDelete("cascade");
    table
      .integer("customer_id")
      .notNullable()
      .references("customer_id")
      .inTable("customer")
      .onDelete("cascade");
    table.timestamp("member_added_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.hasTable("group_member").then(function (exists) {
    if (exists) {
      return knex.schema.dropTable("group_member");
    }
  });
};
