'use strict'

/**
 * Factory create a createTaskMiddleware
 *
 * @param {Object} taskRepository
 * @returns {Function}
 */
module.exports = (taskRepository) => async (ctx, next) => {
  const taskDesc = ctx.request.body.task
  ctx.assert(taskDesc, 400, '\'task\' is required')

  const task = taskRepository.add(taskDesc)
  ctx.status = 201
  ctx.body = Object.assign({}, task, {
    createdAt: task.createdAt.toJSON(),
    updatedAt: task.updatedAt.toJSON()
  })
}
