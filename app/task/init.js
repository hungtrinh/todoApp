'use strict'

const {createTaskMiddleware} = require('./task-middleware')

module.exports = initTaskModule

function initTaskModule (router) {
  router.post('/task', createTaskMiddleware)
}
