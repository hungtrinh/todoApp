'use strict'

const container = require('../config/container')
const app = container.app
const bodyParser = container.bodyParser
const nonSecureRoutes = container.nonSecureRoutes

app.use(bodyParser())
  .use(nonSecureRoutes.routes())
  .use(nonSecureRoutes.allowedMethods())

module.exports = app
