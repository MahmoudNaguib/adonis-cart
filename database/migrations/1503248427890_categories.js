'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriesSchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments();
      table.bigInteger('parent_id').unsigned().nullable().index();
      table.string('title', 180).nullable();
      table.string('image', 180).nullable();
      table.boolean('is_active').nullable().defaultTo(1).index();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps();
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategoriesSchema
