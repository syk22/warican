exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("group_member")
    .del()
    .then(function () {
      return knex("group_member").insert([
        // hard coded 1st group
        { group_id: 1, customer_id: 1 },
        { group_id: 1, customer_id: 2 },
        { group_id: 1, customer_id: 3 },
        { group_id: 1, customer_id: 4 },
        { group_id: 1, customer_id: 5 },

        // hard coded 2nd groups
        { group_id: 2, customer_id: 6 },
        { group_id: 2, customer_id: 7 },
        { group_id: 2, customer_id: 8 },
        { group_id: 2, customer_id: 9 },
      ]);
    });
};
