'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.create('cart', (table) => {
      table.increments();
      table.bigInteger('product_id').unsigned().nullable().index();
      table.bigInteger('quantity').unsigned().nullable().defaultTo(1).index();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps();
    })
  }
  down () {
    this.drop('cart')
  }
}

module.exports = CartSchema
