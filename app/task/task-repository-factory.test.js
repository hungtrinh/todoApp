'use strict'

const test = require('tape')

const taskRepositoryFactory = require('./task-repository-factory')

test('will raise error when missing "db" options param', t => {
  t.throws(_ => {
    taskRepositoryFactory()
  }, 'opts.db is required')
  t.end()
})

// test('create task whill raise error when missing "task" options param', t => {
//   t.throws(_ => {
//     const taskRepository = taskRepositoryFactory({db: 'db'})
//   }, 'opts.task is required')
//   t.end()
// })
