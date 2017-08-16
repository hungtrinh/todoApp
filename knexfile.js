'use strict'

const appConfig = require('./config')
const {db: {
  username,
  password,
  name,
  host,
  port,
  connectionLimit
}} = appConfig

const connectionByEnv = {
  host: host,
  database: name,
  user: username,
  password: password,
  port: port
}
const poolByEnv = {
  min: 2,
  max: connectionLimit
}

module.exports = {

  development: {
    client: 'mysql',
    connection: connectionByEnv,
    pool: poolByEnv,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'mysql',
    connection: connectionByEnv,
    pool: poolByEnv,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: connectionByEnv,
    pool: poolByEnv,
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
