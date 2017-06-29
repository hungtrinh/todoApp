'use strict'

exports.create = (desc = '') => Object.freeze({
  description: desc,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  completed: false
})
