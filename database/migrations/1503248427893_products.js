'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments();
      table.bigInteger('category_id').unsigned().nullable().index();
      table.string('title', 180).nullable();
      table.text('content').nullable();
      table.float('price',8,2).nullable().defaultTo(0).index();
      table.string('image', 180).nullable();
      table.string('meta_keywords', 180).nullable();
      table.text('meta_description').nullable();
      table.boolean('is_active').nullable().defaultTo(1).index();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps();
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
