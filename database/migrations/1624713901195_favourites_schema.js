'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FavouritesSchema extends Schema {
  up () {
    this.create('favourites', (table) => {
      table.increments()
      table.bigInteger('product_id').unsigned().nullable().index();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps()
    })
  }

  down () {
    this.drop('favourites')
  }
}

module.exports = FavouritesSchema
