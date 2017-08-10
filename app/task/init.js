'use strict'

const createMiddleware = require('./create- middleware')

module.exports = initTaskModule

function initTaskModule (router) {
  router.post('/task', createMiddleware)
}
