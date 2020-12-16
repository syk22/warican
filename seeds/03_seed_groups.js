exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("groups")
    .del()
    .then(function () {
      return knex("groups").insert([
        // hard coded groups
        { group_name: "cha-han" },
        { group_name: "bombi-girls" },
      ]);
    });
};
