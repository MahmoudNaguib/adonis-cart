'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments()
      table.bigInteger('user_id').unsigned().nullable().index()
      table.string('token', 255).nullable().index()
      table.string('type', 80).nullable()
      table.boolean('is_revoked').nullable().defaultTo(0).index();
      table.timestamps()
    })
  }
  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
