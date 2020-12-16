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
      directory: __dirname + "/migrations",
      loadExtensions: [".js"],
    },
    seeds: {
      directory: __dirname + "/seeds",
      loadExtensions: [".js"],
    },
  },
  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    searchPath: "public",
    migrations: {
      directory: __dirname + "/migrations",
      loadExtensions: [".js"],
    },
    seeds: {
      directory: __dirname + "/seeds",
      loadExtensions: [".js"],
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    searchPath: "public",
  },
};
