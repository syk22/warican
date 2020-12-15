exports.up = function (knex) {
  return knex.schema.createTable("review", function (table) {
    table.increments("review_id").primary().unique();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.integer("rating").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("profile_id")
      .notNullable()
      .references("profile_id")
      .inTable("profile");
    table
      .integer("product_id")
      .notNullable()
      .references("product_id")
      .inTable("product");
  });
};

exports.down = function (knex) {};
