
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("customer")
    .del()
    .then(function () {
      return knex("customer").insert([
        { user_name: "eliot"},
        { user_name: "naoto"},
        { user_name: "misho"},
        { user_name: "sayaka"},
        { user_name: "kaisei"},
      ]);
    });
};
