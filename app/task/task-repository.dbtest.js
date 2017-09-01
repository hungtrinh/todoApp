'use strict'

const path = require('path')

const test = require('tape-async')
const container = require(path.resolve(__dirname, '../../config/container'))
const db = container.db
const taskRepository = container.taskRepository

require('leaked-handles').set({
  fullStack: true, // use full stack traces
  // timeout: 30000, // run every 30 seconds instead of 5.
  debugSockets: true // pretty print tcp thrown exceptions.
})

test('taskRepository.add("task desc") will return promise<task>"', async t => {
  const taskDesc = 'lam bai tap di'

  await db.migrate.rollback()
  await db.migrate.latest()
  const task = await taskRepository.add(taskDesc)

  t.equals(task.id, 1)
  t.equals(task.description, taskDesc)
  t.equals(task.createdAt, task.updatedAt)
  t.notOk(task.completed)
  db.destroy(t.end)
})
