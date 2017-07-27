'use strict'

const test = require('tape')
const supertest = require('supertest')

const app = require('./index.js')

const server = app.listen()
const request = supertest(server)

test('Access home page will display Hello World string', t => {
  request
    .get('/')
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      t.equals(res.text, 'Hello World')
      t.end()
    })
})

server.close()
