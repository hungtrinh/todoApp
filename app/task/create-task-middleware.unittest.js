'use strict'

const path = require('path')

const test = require('tape')
const request = require('supertest')
// const Koa = require('koa')
// const td = require('testdouble')
// const bodyParser = require('koa-bodyparser')

// const createTaskMiddlewareFactory = require('./create-task-middleware-factory')
// const taskRepositoryFactory = require('./task-repository-factory')
// const taskModelFactory = require('./task-model-factory')

const serverOnline = _ => {
  const appPath = path.resolve(__dirname, '../app')
  const app = require(appPath)
  return app.listen().close()
}

test('POST /task with empty data then receive status code 400 with notice message', t => {
  const expectedHttpCode = 400
  const expectedBodyMessage = 'description \'task\' required'

  request(serverOnline())
    .post('/task')
    .expect(expectedHttpCode, expectedBodyMessage, t.end)
})

test('POST /task with task field then return status code 201', t => {
  const taskDesc = 'lam viec de'
  const postData = {task: taskDesc}
  const expectedCreatedCode = 201
  const expectedTask = {
    id: 1,
    description: taskDesc
  }

  request(serverOnline())
    .post('/task')
    .send(postData)
    .expect('Content-Type', /json/)
    .expect(expectedCreatedCode, expectedTask, t.end)
})
