'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressesSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments();
      table.string('title', 180).nullable();
      table.bigInteger('country_id').unsigned().nullable().index();
      table.string('city', 180).nullable();
      table.string('district', 180).nullable();
      table.string('zip_code', 180).nullable();
      table.text('address').nullable();
      table.text('notes').nullable();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps();
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressesSchema
