'use strict'

const path = require('path')

const test = require('tape')
const request = require('supertest')
const td = require('testdouble')

const container = require(path.resolve(__dirname, '../../config/container'))

const serverOnline = _ => {
  const appPath = path.resolve(__dirname, '../app')
  const app = require(appPath)
  return app.listen().close()
}

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
  td.replace(container, 'taskRepository', stubTaskReposnitory)

  request(serverOnline())
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

test('POST /task with empty data then receive status code 400 with notice message', t => {
  const expectedHttpCode = 400
  const expectedBodyMessage = 'description \'task\' required'

  request(serverOnline())
    .post('/task')
    .expect(expectedHttpCode, expectedBodyMessage, t.end)
})
