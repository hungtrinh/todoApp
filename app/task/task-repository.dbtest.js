'use strict'

const path = require('path')

const test = require('tape-async')

const setup = () => {
  const container = require(path.resolve(__dirname, '../../config/container'))
  const db = container.dbFactory()
  const taskModelFactory = require('./task-model-factory')
  const taskRepositoryFactory = require('./task-repository-factory')
  const taskRepository = taskRepositoryFactory({db, taskModelFactory})
  return {
    db,
    taskRepository
  }
}

test('taskRepository.add("task desc") will return promise<task>"', async t => {
  const {db, taskRepository} = setup()
  await db.migrate.rollback().then(() => db.migrate.latest())

  const taskDesc = 'lam bai tap di'
  const task = await taskRepository.add(taskDesc)

  t.equals(task.id, 1)
  t.equals(task.description, taskDesc)
  t.equals(task.createdAt, task.updatedAt)
  t.false(task.completed)

  await db.destroy()
  t.end()
})

test('taskRepository.add("task desc") inserted into task db table"', async t => {
  const {db, taskRepository} = setup()
  await db.migrate.rollback().then(() => db.migrate.latest())

  const taskDesc = 'lam bai tap di'
  await taskRepository.add(taskDesc)
  const {'count(*)': numberRow} = (await db('task').count().first())
  const task = await db.select().from('task').where('id', '=', 1).first()

  t.equal(numberRow, 1)

  t.equal(task.id, 1)
  t.equal(task.description, taskDesc)
  t.equal(task.is_completed, 0)
  t.equal(+task.created_at, +task.updated_at)

  await db.destroy()
  t.end()
})
