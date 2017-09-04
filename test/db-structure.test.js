'use strict'

const path = require('path')

const test = require('tape-async')
const knexConfigFilePath = path.resolve(__dirname, '../knexfile')
const knexConfig = require(knexConfigFilePath)
const knex = require('knex')(knexConfig)

test('Recreate database', async t => {
  await knex.migrate.rollback()
  await knex.migrate.latest()
})

test('task table structure', async t => {
  const allColumnSpec = await knex('task').columnInfo()
  const actualNumberColumn = Object.keys(allColumnSpec).length

  const idColumnSpec = allColumnSpec['id']
  const descriptionColumnSpec = allColumnSpec['description']
  const isCompletedColumnSpec = allColumnSpec['is_completed']
  const createdAtColumnSpec = allColumnSpec['created_at']
  const updatedAtColumnSpec = allColumnSpec['updated_at']

  t.ok(await knex.schema.hasTable('task'))
  t.equals(actualNumberColumn, 5)

  t.test('task.id column spec', st => {
    st.equal(idColumnSpec.defaultValue, null)
    st.equal(idColumnSpec.type, 'int')
    st.equal(idColumnSpec.maxLength, null)
    st.false(idColumnSpec.nullable)
    st.end()
  })

  t.test('task.description column spec', st => {
    st.equal(descriptionColumnSpec.defaultValue, null)
    st.equal(descriptionColumnSpec.type, 'varchar')
    st.equal(descriptionColumnSpec.maxLength, 255)
    st.false(descriptionColumnSpec.nullable)
    st.end()
  })

  t.test('task.is_completed column spec', st => {
    st.equal(isCompletedColumnSpec.defaultValue, null)
    st.equal(isCompletedColumnSpec.type, 'tinyint')
    st.equal(isCompletedColumnSpec.maxLength, null)
    st.false(isCompletedColumnSpec.nullable)
    st.end()
  })

  t.test('task.created_at column spec', st => {
    st.equal(createdAtColumnSpec.defaultValue, null)
    st.equal(createdAtColumnSpec.type, 'datetime')
    st.equal(createdAtColumnSpec.maxLength, null)
    st.false(createdAtColumnSpec.nullable)
    st.end()
  })

  t.test('task.updated_at column spec', st => {
    st.equal(updatedAtColumnSpec.defaultValue, null)
    st.equal(updatedAtColumnSpec.type, 'datetime')
    st.equal(updatedAtColumnSpec.maxLength, null)
    st.false(updatedAtColumnSpec.nullable)
    st.end()
  })

  t.end()
})

test('Close database connection', async t => {
  await knex.destroy()
  t.end()
})
