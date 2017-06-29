'use strict'

/**
 * Create an task
 *
 * @param {object} | string task
 * @param {string} task.description
 * @param {Date} task.createdAt
 * @param {Date} task.updatedAt
 * @param {boolean} task.completed
 *
 * @return {object} {description, createdAt, updatedAt, completed}
 */
exports.create = (task) => {
  const today = Date.now()
  const {
    description,
    createdAt,
    updatedAt,
    completed
  } = (typeof task === 'string') ? {description: task} : task

  return Object.freeze({
    description: description || '',
    createdAt: createdAt || today,
    updatedAt: updatedAt || today,
    completed: completed || false
  })
}
