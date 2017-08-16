'use strict'
const {env} = require('../config')
const knextConnectionConfigByEnv = require('../knextfile')[env]

/**
 * Expose knex connection
 */
module.exports = require('knex')(knextConnectionConfigByEnv)
