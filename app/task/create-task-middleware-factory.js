'use strict'

/**
 * Factory create a createTaskMiddleware
 *
 * @param {Object} taskRepository
 * @returns {Function}
 */
module.exports = (taskRepository) => async (ctx, next) => {
  const taskDesc = ctx.request.body.task
  let task
  ctx.assert(taskDesc, 400, 'description \'task\' required')

  task = taskRepository.create(taskDesc)
  ctx.status = 201
  ctx.body = Object.assign({}, task, {
    createdAt: task.createdAt.toJSON(),
    updatedAt: task.updatedAt.toJSON()
  })
}
