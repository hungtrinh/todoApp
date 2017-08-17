'use strict'

const mysql = require('mysql')
const assert = require('assert')

const config = require('../config')

module.exports = mysqlQueryFactory

/**
 * Create mysql query wrapper
 *
 * @param {object} opts default get from config.db
 * @property {string} opts.host database ip or host name
 * @property {string} opts.name database name
 * @property {string} opts.user database username
 * @property {string} opts.password database password
 * @property {Number} opts.connectionLimit database max connection pool
 *
 * @returns {object}
 */
function mysqlQueryFactory ({
  host,
  name,
  user,
  password,
  connectionLimit
} = config.db) {
  assert(host, 'opts.host is required to create mysql database connection')
  assert(name, 'opts.name is required to create mysql database connection')
  assert(user, 'opts.user is required to create mysql database connection')
  assert(password, 'opts.password is required to create mysql database connection')
  assert(connectionLimit, 'opts.connectionLimit is required to create mysql database connection')

  const connectionPool = mysql.createPool({
    connectionLimit: connectionLimit,
    host,
    user,
    password,
    database: name
  })
  return {
    query,
    getConnection,
    escape: mysql.escape
  }

  /**
   * @returns {Promise<connection>}
   */
  function getConnection () {
    return new Promise((resolve, reject) => {
      connectionPool.getConnection((err, connection) => {
        if (err) reject(err)
        resolve(connection)
      })
    })
  }// getConnection

  /**
   * @param {string} sql
   * @param {Promise} connecting
   * @returns {Promise}
   */
  function query (sql = '', connecting = getConnection()) {
    const doQuery = connection => new Promise((resolve, reject) => {
      connection.query(sql, promisingQueryResult)
      function promisingQueryResult (error, results, fields) {
        connection.release()
        if (error) reject(error)
        resolve(results)
      }
    })
    return connecting.then(doQuery)
  }// query
}
