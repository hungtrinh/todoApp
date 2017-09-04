'use strict'

const appConfig = require('./config')
const {db: {
  username: user,
  password,
  name: database,
  host,
  port,
  connectionLimit: max
}} = appConfig

module.exports = {
  client: 'mysql',
  connection: process.env.DATABASE_URL || {
    host,
    database,
    user,
    password,
    port: port
  },
  pool: {
    min: 1,
    max: max
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
