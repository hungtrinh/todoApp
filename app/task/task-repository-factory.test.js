'use strict'

const test = require('tape')

const taskRepositoryFactory = require('./task-repository-factory')

test('will raise error when missing "db" options param', t => {
  t.throws(taskRepositoryFactory, 'opts.db is required')
  t.end()
})
