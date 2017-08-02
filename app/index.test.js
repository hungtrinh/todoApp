'use strict'

const test = require('tape')
const request = require('supertest')
const app = require('./index.js')
const getServer = (app) => app.listen().close()

test('Access home page will display Hello World string', t => {
  request(getServer(app))
    .get('/')
    .expect(200)
    .end((err, res) => {
      t.ifError(err)
      t.equals(res.text, 'Hello World')
      t.end()
    })
})
