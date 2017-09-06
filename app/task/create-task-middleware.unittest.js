'use strict'

const path = require('path')

const test = require('tape-async')
const request = require('supertest')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const today = new Date()
const stubTaskReposnitory = {
  create: task => ({
    id: 1,
    description: task,
    createdAt: today,
    updatedAt: today,
    completed: true,
    done: _ => false
  })
}
const serverOnline = stubTaskReposnitory => {
  const createTaskMiddlewareFactory = require(path.resolve(__dirname, './create-task-middleware-factory'))
  const app = new Koa()

  app.use(bodyParser())
  app.use(createTaskMiddlewareFactory(stubTaskReposnitory))
  return app.listen().close()
}

test('POST /task with empty data then receive status code 400 with notice message', async t => {
  const expectedHttpCode = 400
  const expectedBodyMessage = 'description \'task\' required'
  const resp = await request(serverOnline(stubTaskReposnitory)).post('/task')

  try {
    t.equal(resp.type, 'text/plain')
    t.equal(resp.status, expectedHttpCode)
    t.equal(resp.text, expectedBodyMessage)
  } catch (e) {}

  t.end()
})

test('POST /task with task field then return status code 201', t => {
  const taskDesc = 'lam viec de'
  const expectedResponse = {
    id: 1,
    description: taskDesc,
    createdAt: today.toJSON(),
    updatedAt: today.toJSON(),
    completed: true
  }
  request(serverOnline(stubTaskReposnitory))
    .post('/task')
    .send({task: taskDesc})
    .then(resp => {
      t.equal(resp.type, 'application/json')
      t.equal(resp.status, 201)
      t.looseEquals(resp.body, expectedResponse)

      t.end()
    })
    .catch(t.end)
})
