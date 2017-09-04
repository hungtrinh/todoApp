'use strict'
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const knex = require('knex')
const knexFileConfigDefault = path.resolve(__dirname, '../knexfile')

let taskRepository
let db

/**
 * dependencies container define
 */
const deps = {
  get bodyParser () {
    return bodyParser
  },
  get app () {
    return new Koa()
  },
  get nonSecureRoutes () {
    const nonSecureRoute = new Router()
    require('../app/task').routes(nonSecureRoute)
    return nonSecureRoute
  },
  get createTaskMiddleware () {
    return require('../app/task/create-task-middleware-factory')(deps.taskRepository)
  },
  get taskRepository () {
    if (!taskRepository) {
      deps.taskRepository = require('../app/task/task-repository-factory')({
        db: deps.db,
        taskModelFactory: require('../app/task/task-model-factory')
      })
    }
    return taskRepository
  },
  set taskRepository (taskRepo) {
    taskRepository = taskRepo
  },
  get db () {
    if (!db) {
      db = dbFactory()
    }
    return db
  },
  set db (knexInstance) {
    db = knexInstance
  },
  dbFactory: dbFactory
}

/**
 * Create database connection instance
 *
 * @param {string} knexfilePath
 * @return {Knex} an instance of Knex object
 */
function dbFactory (knexfilePath = knexFileConfigDefault) {
  const knextConfig = require(knexfilePath)
  return knex(knextConfig)
}

module.exports = deps
