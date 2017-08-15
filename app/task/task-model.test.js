'use strict'

const test = require('tape')

const taskModelFactory = require('./task-model-factory')

test('create a task with task notation', t => {
  const task = taskModelFactory({description: 'an toi voi me'})

  t.equals(task.description, 'an toi voi me')
  t.equals(task.createdAt, task.updatedAt)
  t.equals(task.completed, false)
  t.end()
})

test('create with task description only ', t => {
  const task = taskModelFactory('an toi voi me')

  t.equals(task.description, 'an toi voi me')
  t.equals(task.createdAt, task.updatedAt)
  t.equals(task.completed, false)
  t.end()
})

test('create a task, task is immutable', t => {
  const task = taskModelFactory('an toi voi me')
  const today = Date.now()

  t.throws(() => { task.description = 'do something' })
  t.throws(() => { task.createdAt = today })
  t.throws(() => { task.updatedAt = today })
  t.throws(() => { task.completed = true })
  t.end()
})

test('task.done() success will clone origin task with completed status', t => {
  const createdDate = new Date()

  const task = taskModelFactory({
    description: 'an toi voi me',
    createdAt: createdDate,
    updatedAt: createdDate,
    completed: false
  })
  const taskCompleted = task.done()

  t.test('completed is true', ts => {
    ts.true(taskCompleted.completed)
    ts.end()
  })
  t.test('createdAt same with origin task', ts => {
    ts.equals(taskCompleted.createdAt, task.createdAt)
    ts.end()
  })
  t.test('updatedAt is current time', ts => {
    ts.true(taskCompleted.updatedAt >= taskCompleted.createdAt)
    ts.end()
  })
  t.test('description is same origin task', ts => {
    ts.equals(taskCompleted.description, task.description)
    ts.end()
  })
  t.end()
})

test('task.done() will raise exception when task is completed before', t => {
  const task = taskModelFactory({
    description: 'an toi voi me',
    completed: true
  })
  t.throws(_ => task.done(), "task is completed before don't try do this task again")
  t.end()
})
