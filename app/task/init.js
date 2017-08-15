'use strict'

const {createTaskMiddlewareFactory} = require('./create-task-middleware-factory')
const taskRepository = {create: taskDesc => ({id: 1, description: taskDesc})}
module.exports = (router) => {
  router.post('/task', createTaskMiddlewareFactory(taskRepository))
}
