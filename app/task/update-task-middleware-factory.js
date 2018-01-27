'use strict'

/**
 * Factory create a createTaskMiddleware
 *
 * @param {Object} taskRepository
 * @returns {Function}
 */
module.exports = (taskRepository) => async (ctx, next) => {
  const {id} = ctx.params
  const {completed} = ctx.request.body
  let task
  ctx.assert(id, 400, 'task \'id\' is required')
  ctx.assert(completed, 400, '\'completed\' is required')

  // task = taskRepository.create(taskDesc)
  ctx.status = 201
  ctx.body = Object.assign({}, task, {
    createdAt: task.createdAt.toJSON(),
    updatedAt: task.updatedAt.toJSON()
  })
}
