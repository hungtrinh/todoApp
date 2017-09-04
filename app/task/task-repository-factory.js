'use strict'

const assert = require('assert')
const path = require('path')

const knex = require('knex')

const knexConfigFilePath = path.resolve(__dirname, '../../knexfile')
const knexConfigDefault = require(knexConfigFilePath)

/**
 * Factory create a taskRepository
 * @param {object} opts
 * @property {object} opts.db
 * @property {Function} opts.taskModelFactory
 * @returns {object}
 */
module.exports = ({
  db = knex(knexConfigDefault),
  taskModelFactory = require('./task-model-factory')
} = {}) => {
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
