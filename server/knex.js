const Knex = require("knex");
const knexConfig = require("../knexfile.js");
require("dotenv").config();

/* Required in .env
   DB_HOST --> localhost
   DB_USERNAME --> your username
   DB_PASSWORD --> your password
   DB_NAME --> your database name (pls create database)
*/

let knex;

if (
  process.env
    .DATABASE_URL /*Production deployment is done in Heroku using DATABASE_URL*/
) {
  knex = Knex(knexConfig.production);
} else {
  knex = Knex(knexConfig.development);
}

module.exports = knex;