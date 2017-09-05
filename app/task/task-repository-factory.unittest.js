'use strict'

const test = require('tape')

const taskRepositoryFactory = require('./task-repository-factory')

test('taskRepositoryFactory() will raise error "opts.db is required"', t => {
  t.throws(() => {
    taskRepositoryFactory({db: null})
  }, /opts.db is required/)
  t.throws(() => {
    taskRepositoryFactory({db: ''})
  }, /opts.db is required/)
  t.end()
})

test('taskRepositoryFactory({db: "stubDbObj"}) will raise error "opts.taskModelFactory is required"', t => {
  t.throws(() => {
    taskRepositoryFactory({db: 'stubDbObj', taskModelFactory: null})
  }, /opts.taskModelFactory is required/)
  t.throws(() => {
    taskRepositoryFactory({db: 'stubDbObj', taskModelFactory: ''})
  }, /opts.taskModelFactory is required/)
  t.end()
})
