'use strict'
const appConfig = require('./index')
const {
  username,
  password,
  name,
  host,
  port,
  connectionLimit
} = appConfig.db

/**
 * Expose knex connection
 */
module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host,
    port,
    user: username,
    password,
    database: name
  },
  pool: { min: 0, max: connectionLimit }
})
