const restaurant = require("./restaurant.json");

exports.seed = function (knex) {

  // Objective: creating 10 receipts from 10 different restaurants -> insert receipt info to table

  // storing all the seed info into "receiptInfo" in array of object.
  const receiptInfo = [];

  // looping first 5 restaurants for the 1st groups receipt
  for (let i = 0; i < 5; i++) {
    // order info will be stored here
    const order = {};
    let balance = 0; // calculated total balance in YEN (original value from documenu is in USD * 100)
    // iterate through the restaurants menu property, getting 8 menu_item
    for (let j = 0; j < 8; j++) {
      const food_name = restaurant[i].restaurant_menu[j].menu_item_name;
      const food_price = Math.ceil(
        restaurant[i].restaurant_menu[j].menu_item_price * 100 // converting price to JPY
      );
      order[food_name] = food_price; // storing food name as key and food price as value;
      balance = balance + food_price; // adding the each food price to balance
    }
    JSON.stringify(order); // to store object in postgres via knex -> need to be in JSON
    // push the full receipt info "receiptInfo" 
    receiptInfo.push({
      order,
      currency: "JPY",
      balance,
      balance_string: `${balance} 円`,
      merchant_id: i + 1,
      group_id: 1, // hard coding the receipt link to group 1, which is group "cha-han"
    });
  }

  // looping next 5 restaurants for the 2nd groups receipt
  for (let i = 5; i < 10; i++) {
    const order = {};
    let balance = 0;
    for (let j = 8; j < 16; j++) {
      const food_name = restaurant[i].restaurant_menu[j].menu_item_name;
      const food_price = Math.ceil(
        restaurant[i].restaurant_menu[j].menu_item_price * 100
      );
      order[food_name] = food_price;
      balance += food_price;
    }
    JSON.stringify(order);
    receiptInfo.push({
      order,
      currency: "JPY",
      balance,
      balance_string: `${balance} 円`,
      merchant_id: i + 1,
      group_id: 2, // hard coding the receipt link to group 2, which is group "bombi-girl"
    });
  }

  // Deletes ALL existing entries
  return knex("receipt")
    .del()
    .then(function () {
      return knex("receipt").insert(receiptInfo);
    });
};
