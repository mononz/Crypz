// Update with your config settings.
var dotenv = require('dotenv');
dotenv.load();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host:     'localhost',
      database: 'crypz',
      user:     'crypz',
      password: 'crypz',
      port:     '5432'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: process.env.DB_CLIENT,
    connection: {
      host:     process.env.DB_HOST,
      database: process.env.DB_USER,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      port:     process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: process.env.DB_CLIENT,
    connection: {
      host:     process.env.DB_HOST,
      database: process.env.DB_USER,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      port:     process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
