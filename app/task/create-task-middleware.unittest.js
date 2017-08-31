'use strict'

const path = require('path')

const test = require('tape')
const request = require('supertest')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const td = require('testdouble')

const serverOnline = stubTaskReposnitory => {
  const createTaskMiddlewareFactory = require(path.resolve(__dirname, './create-task-middleware-factory'))
  const app = new Koa()

  app.use(bodyParser())
  app.use(createTaskMiddlewareFactory(stubTaskReposnitory))
  return app.listen().close()
}

test('POST /task with empty data then receive status code 400 with notice message', t => {
  const expectedHttpCode = 400
  const expectedBodyMessage = 'description \'task\' required'
  const stubTaskReposnitory = {
    create (task) {
      return {
        id: 1,
        description: task
      }
    }
  }
  request(serverOnline(stubTaskReposnitory))
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
  const stubTaskReposnitory = {
    create (task) {
      return {
        id: 1,
        description: task
      }
    }
  }
  request(serverOnline(stubTaskReposnitory))
    .post('/task')
    .send(postData)
    .expect('Content-Type', /json/)
    .expect(expectedCreatedCode, expectedTask)
    .then(resp => {
      td.reset()
      t.end()
    })
    .catch(console.log)
})
