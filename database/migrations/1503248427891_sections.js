'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionsSchema extends Schema {
  up () {
    this.create('sections', (table) => {
      table.increments();
      table.string('title', 180).nullable();
      table.string('image', 180).nullable();
      table.boolean('is_active').nullable().defaultTo(1).index();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps();
    })
  }

  down () {
    this.drop('sections')
  }
}

module.exports = SectionsSchema
