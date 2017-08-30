'use strict'

const path = require('path')

const container = require(path.resolve(__dirname, '../../config/container'))
const createTaskMiddleware = container.createTaskMiddleware

/**
 * Init task module
 * @prams {object} router
 * @return void
 */
module.exports = (router) => router.post('/task', createTaskMiddleware)
