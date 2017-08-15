'use strict'

const {createTaskMiddlewareFactory} = require('./task-middleware-factory')
const container = {get: x => x}
module.exports = (router) => {
  router.post('/task', createTaskMiddlewareFactory(container))
}
