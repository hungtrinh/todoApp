'use strict'

const assert = require('assert')

/**
 * Factory create a taskRepository
 * @param {object} opts
 * @property {object} opts.db
 * @property {Function} opts.taskModelFactory
 * @returns {object}
 */
module.exports = ({db, taskModelFactory} = {}) => {
  assert(db, 'opts.db is required')
  assert(taskModelFactory, 'opts.taskModelFactory is required')

  return {
    add
  }

  async function add (task) {
    const {
      description,
      createdAt,
      updatedAt,
      completed
    } = taskModelFactory(task)
    const [id] = await db.insert({
      description: description,
      created_at: createdAt,
      updated_at: updatedAt,
      is_completed: completed
    }).into('task')

    return Promise.resolve(taskModelFactory({
      id,
      description,
      createdAt,
      updatedAt,
      completed
    }))
  }
}
