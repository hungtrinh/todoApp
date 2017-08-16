'use strict'

const test = require('tape')

const taskRepositoryFactory = require('./task-repository-factory')

test('will raise error when missing "db" options param', t => {
  t.throws(taskRepositoryFactory, /opts.db is required/)
  t.end()
})

test('will raise error when missing "taskModelFactory" options param', t => {
  t.throws(() => {
    taskRepositoryFactory({db: 'stub db connection'})
  }, /opts.taskModelFactory is required/)
  t.end()
})
