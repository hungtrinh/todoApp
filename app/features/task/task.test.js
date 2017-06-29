'use strict'

const test = require('tape-promise/tape')
const Task = require('./task')

test('create a task', assert => {
  const task = Task.create('an toi voi me')
  const today = Date.now()

  assert.equals(task.description, 'an toi voi me')
  assert.equals(task.createdAt, today)
  assert.equals(task.createdAt, task.updatedAt)
  assert.equals(task.completed, false)
  assert.end()
})

test('create a task, task is immutable', assert => {
  const task = Task.create('an toi voi me')

  assert.throws(() => { task.description = 'do something' })
  assert.end()
})
