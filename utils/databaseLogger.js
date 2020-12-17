const knex = require("../server/knex.js");

async function getMerchant() {
  const merchant = await knex.select().table("merchant"); // array of object (each element is the merchant(restaurant) info)
  console.log("All Merchant:", merchant);
  return merchant;
}

// Sample to see how the restaurant_menu object is structured
async function getMenuOfRestaurant() {
  const merchant = await knex.select().table("merchant"); 
  console.log("Restaurant Menu Object:", merchant[0].restaurant_menu); // selecting one merchant and accessing the restaurant_menu property
  return merchant[0].restaurant_menu;
}

async function getReceipt() {
  const receipt = await knex.select().table("receipt"); // array of object (each element is the receipt info)
  console.log("All Receipt:", receipt);
  return receipt;
}

// Sample to see how the order object is structured
async function getOrderOfReceipt() {
  const receipt = await knex.select().table("receipt");
  console.log("Order Object:", receipt[0].order); // selecting one receipt and accessing the order property
  return receipt[0].order;
}

async function getCustomer() {
  const customer = await knex.select().table("customer");  // array of object (each element is the customer info)
  console.log("All Customer:", customer);
  return customer;
}

async function getGroups() {
  const groups = await knex.select().table("groups"); // array of object (each element is the groups info)
  console.log("All Groups:", groups);
  return groups;
}

/*Uncomment the one you want to log*/

// getMerchant();
// getMenuOfRestaurant();
// getReceipt();
// getOrderOfReceipt();
// getCustomer();
// getGroups();
