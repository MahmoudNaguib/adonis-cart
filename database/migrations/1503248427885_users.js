'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.enu('type', ['Admin','Guest']).nullable().defaultTo('Guest').index();
      table.string('name', 180).nullable().index();
      table.string('email', 180).nullable().index();
      table.string('mobile', 180).nullable().index();
      table.string('password', 180).nullable().index();
      table.string('image', 180).nullable();
      table.string('remember_token', 180).nullable().index();
      table.string('confirm_token', 180).nullable().index();
      table.string('password_token', 180).nullable().index();
      table.string('last_ip', 180).nullable();
      table.timestamp('last_logged_in_at').nullable();
      table.boolean('confirmed').nullable().defaultTo(0).index();
      table.boolean('is_active').nullable().defaultTo(1).index();
      table.timestamps();
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
