'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationsSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments();
      table.bigInteger('user_id').unsigned().nullable().index();
      table.text('content').nullable();
      table.string('entity_type', 25).nullable().index();
      table.bigInteger('entity_id').unsigned().nullable().index();
      table.timestamp('seen_at').nullable();
      table.boolean('send_email').nullable().defaultTo(0).index();
      table.boolean('send_push').nullable().defaultTo(0).index();
      table.timestamps();
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationsSchema
