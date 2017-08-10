'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

require('./task').init(router)

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World'
})

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())
module.exports = app
