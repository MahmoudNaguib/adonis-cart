'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CountriesSchema extends Schema {
  up () {
    this.create('countries', (table) => {
      table.increments();
      table.string('iso', 3).nullable().index();
      table.string('dial_code', 6).nullable().index();
      table.string('title', 180).nullable();
      table.boolean('is_active').nullable().defaultTo(1).index();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps();
    })
  }

  down () {
    this.drop('countries')
  }
}

module.exports = CountriesSchema
