'use strict'

module.exports = {
  username: process.env.DB_UERNAME || 'root',
  password: process.env.DB_PASSWORD || 'cdmllove',
  name: process.env.DB_NAME || 'db name',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 100
}
