'use strict'

const path = require('path')

const test = require('tape-async')
const assertHttp = require('http-assert')
const createTaskMiddlewareFactory = require(
  path.resolve(__dirname, './create-task-middleware-factory')
)

test(`Will raise error when missing 'task' in body request`, async t => {
  const today = new Date()
  const stubTaskReposnitory = {
    add: task => ({
      id: 1,
      description: task,
      createdAt: today,
      updatedAt: today,
      completed: true,
      done: () => false
    })
  }
  const createTaskMiddleware = createTaskMiddlewareFactory(stubTaskReposnitory)
  const next = {}
  const ctx = {
    assert: assertHttp,
    request: {
      body: {}
    }
  }
  t.plan(2)
  try {
    await createTaskMiddleware(ctx, next)
  } catch (e) {
    t.true(e instanceof Error)
    t.equal(e.message, `'task' is required`)
  }
})

test(`When post 'task' description then return task saved by taskRepository `, async t => {
  const today = new Date()
  const stubTaskReposnitory = {
    add: task => ({
      id: 1,
      description: task,
      createdAt: today,
      updatedAt: today,
      completed: false
    })
  }
  const expectedResponse = {
    id: 1,
    description: 'call to mama',
    createdAt: today.toJSON(),
    updatedAt: today.toJSON(),
    completed: false
  }
  const createTaskMiddleware = createTaskMiddlewareFactory(stubTaskReposnitory)
  const next = {}
  const ctx = {
    assert: assertHttp,
    request: {
      body: {
        task: 'call to mama'
      }
    },
    response: {},
    body: ''
  }

  t.plan(1)
  await createTaskMiddleware(ctx, next)
  t.deepLooseEqual(ctx.body, expectedResponse)
})
