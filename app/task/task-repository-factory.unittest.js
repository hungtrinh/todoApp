'use strict'

const test = require('tape')

const taskRepositoryFactory = require('./task-repository-factory')

test('taskRepositoryFactory() will raise error "opts.db is required"', t => {
  t.throws(taskRepositoryFactory({}), /opts.db is required/)
  t.end()
})

test('taskRepositoryFactory({db: "stubDbObj"}) will raise error "opts.taskModelFactory is required"', t => {
  t.throws(() => {
    taskRepositoryFactory({db: 'stub db connection'})
  }, /opts.taskModelFactory is required/)
  t.end()
})
