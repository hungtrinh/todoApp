'use strict'

const assert = require('assert')

module.exports = ({db} = {}) => {
  assert(db, 'opts.db is required')
  return {
  }
}
