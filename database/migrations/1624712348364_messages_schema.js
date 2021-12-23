'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments();
      table.string('name', 180).nullable();
      table.string('email', 180).nullable();
      table.text('content').nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
