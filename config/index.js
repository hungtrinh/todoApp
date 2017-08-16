'use strict'

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ silent: true })
}

const env = require('./components/env')
const db = require('./components/db')
const server = require('./components/server')
const mergeConfig = Object.assign({}, env, db, server)
const immutableConfig = Object.freeze(mergeConfig)

module.exports = immutableConfig
