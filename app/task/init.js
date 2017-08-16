'use strict'

const taskModelFactory = require('./task-model-factory')
const taskRepositoryFactory = require('./task-repository-factory')
const createTaskMiddlewareFactory = require('./create-task-middleware-factory')
const db = {}
const taskRepository = taskRepositoryFactory({taskModelFactory, db})
const createTaskMiddleware = createTaskMiddlewareFactory(taskRepository)

/**
 * Init task module
 * @prams {object} router
 * @return void
 */
module.exports = (router) => router.post('/task', createTaskMiddleware)
