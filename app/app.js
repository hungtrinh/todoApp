'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const apiRouter = new Router()

require('./task').init(apiRouter)

app.use(bodyParser())
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods())

module.exports = app
