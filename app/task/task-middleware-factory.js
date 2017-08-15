
module.exports = {
  createTaskMiddlewareFactory
}

function createTaskMiddlewareFactory (container) {
  return createTaskMiddleware

  function createTaskMiddleware (ctx, next) {
    const taskDesc = ctx.request.body.task
    ctx.assert(taskDesc, 400, 'description \'task\' required')
    ctx.status = 201
    ctx.body = {
      id: 1,
      description: taskDesc
    }
  }
}
