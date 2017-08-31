'use strict'

const assert = require('assert')

exports = module.exports = taskModelFactory

/**
 * Create an task
 *
 * @param string | {object} task description or task struct
 * @property {string} task.description
 * @property {Date} task.createdAt default current date if don't set
 * @property {Date} task.updatedAt default current date if don't set
 * @property {boolean} task.completed default false
 *
 * @return {object} {description, createdAt, updatedAt, completed}
 */
function taskModelFactory (task) {
  const today = new Date()
  let {
    description,
    createdAt,
    updatedAt,
    completed
  } = (typeof task === 'string') ? {description: task} : task

  createdAt = createdAt || today
  updatedAt = updatedAt || today
  completed = completed || false

  assert(updatedAt >= createdAt, "task is completed before don't try do this task again")

  return Object.freeze({
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
    completed: completed,
    done: done
  })

  /**
   * Change task to completed status
   * this method don't change current task
   * it will make a new task with origin task description
   *
   * @return {Object} a task
   */
  function done () {
    assert(!completed, "task is completed before don't try do this task again")
    return taskModelFactory({
      description,
      createdAt,
      updatedAt: new Date(),
      completed: true
    })
  }
}
