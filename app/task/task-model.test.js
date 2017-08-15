'use strict'

const test = require('tape')

const taskModelFactory = require('./task-model-factory')

test('create a task with task notation', assert => {
  const task = taskModelFactory({description: 'an toi voi me'})

  assert.equals(task.description, 'an toi voi me')
  assert.equals(task.createdAt, task.updatedAt)
  assert.equals(task.completed, false)
  assert.end()
})

test('create with task description only ', assert => {
  const task = taskModelFactory('an toi voi me')

  assert.equals(task.description, 'an toi voi me')
  assert.equals(task.createdAt, task.updatedAt)
  assert.equals(task.completed, false)
  assert.end()
})

test('create a task, task is immutable', assert => {
  const task = taskModelFactory('an toi voi me')
  const today = Date.now()

  assert.throws(() => { task.description = 'do something' })
  assert.throws(() => { task.createdAt = today })
  assert.throws(() => { task.updatedAt = today })
  assert.throws(() => { task.completed = true })
  assert.end()
})
