require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    searchPath: "public",
    migrations: {
      directory: "./migrations",
      loadExtensions: [".js"],
    },
    seeds: {
      directory: "./data",
      loadExtensions: [".js"],
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    searchPath: "public",
  },
};
