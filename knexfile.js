// Update with your config settings.
require("dotenv");
module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/dev.sqlite3"
    },
    migrations: {
      directory: "./data/migrations/dev/"
    },
    seeds: {
      directory: "./data/seeds/dev/"
    }
  },
  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL_STAGE,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations/staging",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./data/seeds/staging"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations/production",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./data/seeds/production"
    }
  }
}
