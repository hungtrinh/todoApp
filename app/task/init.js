'use strict'

const createTaskMiddlewareFactory = require('./create-task-middleware-factory')
const taskRepository = {create: taskDesc => ({id: 1, description: taskDesc})}

/**
 * Init task module
 * @prams {object} router
 * @return void
 */
module.exports = (router) => {
  router.post('/task', createTaskMiddlewareFactory(taskRepository))
}
