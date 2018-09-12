const functions = require('firebase-functions');

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

  production: {
    client: 'pg',
    connection: {
      host:     functions.config().database.host,
      database: functions.config().database.user,
      user:     functions.config().database.user,
      password: functions.config().database.pass,
      port:     functions.config().database.port
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