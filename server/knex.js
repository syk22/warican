const Knex = require("knex");
const knexConfig = require("../knexfile.js");
require("dotenv").config();

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