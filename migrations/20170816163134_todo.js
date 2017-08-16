const tableName = 'task'
exports.up = (knex, Promise) => knex.schema.createTableIfNotExists(tableName,
  (table) => {
    table.increments()
    table.string('description').notNullable()
    table.boolean('is_completed').notNullable()
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
  }
)

exports.down = (knex, Promise) => knex.schema.dropTableIfExists(tableName)
