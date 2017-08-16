'use strict'

module.exports = {
  db: {
    username: process.env.DB_UERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    name: process.env.DB_NAME || 'test_todo',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10
  }
}
