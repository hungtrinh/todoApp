
module.exports = (taskRepository) => (ctx, next) => {
  const taskDesc = ctx.request.body.task
  ctx.assert(taskDesc, 400, 'description \'task\' required')
  ctx.status = 201
  ctx.body = taskRepository.create(taskDesc)
}
