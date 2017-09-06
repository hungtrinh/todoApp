'use strict'

const test = require('tape')

const taskRepositoryFactory = require('./task-repository-factory')

test('taskRepositoryFactory() will raise error "opts.db is required"', t => {
  const expectedErrorMessage = /opts.db is required/
  t.throws(
    () => taskRepositoryFactory({db: null}),
    expectedErrorMessage
  )
  t.throws(
    () => taskRepositoryFactory({db: ''}),
    expectedErrorMessage
  )
  t.end()
})

test('taskRepositoryFactory({db: "stubDbObj"}) will raise error "opts.taskModelFactory is required"', t => {
  const expectedErrorMessage = /opts.taskModelFactory is required/
  t.throws(
    () => taskRepositoryFactory({db: 'stubDbObj', taskModelFactory: null}),
    expectedErrorMessage
  )
  t.throws(
    () => taskRepositoryFactory({db: 'stubDbObj', taskModelFactory: ''}),
    expectedErrorMessage
  )
  t.end()
})
