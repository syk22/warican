require("dotenv").config();
const Documenu = require("documenu");

// Setting configuration to use given API Key
Documenu.configure(process.env.DOCUMENU_APIKEY);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("restaurant")
    .del()
    .then(async function () {
      const restaurantInfo = [];

      // GET 25 restaurants with menu available
      await Documenu.Restaurants.searchFields({ fullmenu: true })
        .then((restaurants) => {
          // looping all 25 restaurant and pushing an object with id and name of restaurant in 'restaurantInfo'
          for (let { restaurant_id, restaurant_name } of restaurants.data) {
            restaurantInfo.push({ restaurant_id, restaurant_name });
          }
        })
        .then(async (res) => {
          for (let i = 0; i < restaurantInfo.length; i++) {
            // Send restaurant id as params and getting array of menu for the specific restaurant
            // each menu has 'menu_item_name', 'menu_item_pricing'
            const menu = await Documenu.Restaurants.getMenuItems(
              restaurantInfo[i].restaurant_id,
              {
                size: 100,
              }
            );
            // to store the whole menu array, will need to store it was a JSON (string) in database with type json.
            restaurantInfo[i]["restaurant_menu"] = JSON.stringify(menu.data);
          }
        })
        .catch((err) => console.log(err));
      // Inserts seed entries
      return knex("restaurant").insert(restaurantInfo);
    });
};
