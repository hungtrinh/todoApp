'use strict'

const assert = require('assert')

/**
 * Factory create a taskRepository
 * @param {object} opts
 * @property {object} opts.db
 * @property {Function} opts.taskModelFactory
 * @returns {object}
 */
module.exports = ({db, taskModelFactory} = {}) => {
  assert(db, 'opts.db is required')
  assert(taskModelFactory, 'opts.taskModelFactory is required')
  return {
  }
}
