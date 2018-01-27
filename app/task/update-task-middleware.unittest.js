'use strict'

const path = require('path')

const test = require('tape-async')
const httpAssert = require('http-assert')
const updateTaskMiddlewareFactory = require(
  path.resolve(__dirname, './update-task-middleware-factory')
)

const today = new Date()
const stubTaskReposnitory = {
  markTaskCompleted: task => ({
    id: 1,
    description: task,
    createdAt: today,
    updatedAt: today,
    completed: true,
    done: _ => false
  })
}

test('updateTaskMiddleware will raise error if missing \'id\'', async t => {
  const updateTaskMiddleware = updateTaskMiddlewareFactory(stubTaskReposnitory)
  const next = _ => {}
  const ctx = {
    params: {},
    request: {
      body: {}
    },
    assert: httpAssert
  }
  t.plan(1)
  try {
    await updateTaskMiddleware(ctx, next)
  } catch (e) {
    t.true(/task 'id' is required/.test(e))
  }
})

test(`updateTaskMiddleware will raise error 
if missing 'completed' in body request`, async t => {
  const updateTaskMiddleware = updateTaskMiddlewareFactory(stubTaskReposnitory)
  const next = _ => {}
  const ctx = {
    params: {id: 'some id'},
    request: {
      body: {}
    },
    assert: httpAssert
  }
  t.plan(1)
  try {
    await updateTaskMiddleware(ctx, next)
  } catch (e) {
    t.true(/'completed' is required/.test(e))
  }
})
