'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments();
      table.bigInteger('address_id').unsigned().nullable().index();
      table.text('full_address').nullable();
      table.string('contact_name', 180).nullable();
      table.string('contact_mobile', 180).nullable();
      table.text('products').nullable();
      table.float('total',8,2).nullable().defaultTo(0).index();
      table.enu('status', ['Pending','Confirmed','Cancelled','In-Progress','In-Shipment','Delivered','Returned']).nullable().defaultTo('Pending').index();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps();
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
