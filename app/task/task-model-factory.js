'use strict'

// const assert = require('assert')
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
exports = module.exports = taskModelFactory

function taskModelFactory (task) {
  const today = new Date()
  let {
    description,
    createdAt,
    updatedAt,
    completed
  } = (typeof task === 'string') ? {description: task} : task

  description = description || ''
  createdAt = createdAt || today
  updatedAt = updatedAt || today
  completed = completed || false

  return Object.freeze({
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
    completed: completed,
    done: done
  })

  function done () {
    if (completed) {
      throw new Error("task is completed before don't try do this task again")
    }

    return taskModelFactory({
      description,
      createdAt,
      updatedAt: new Date(),
      completed: true
    })
  }
}
