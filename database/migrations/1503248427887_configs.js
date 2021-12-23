'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfigsSchema extends Schema {
  up () {
    this.create('configs', (table) => {
      table.increments();
      table.string('label', 180).nullable();
      table.string('key', 180).nullable();
      table.text('value', 180).nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('configs')
  }
}

module.exports = ConfigsSchema
