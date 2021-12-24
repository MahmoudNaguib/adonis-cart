'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static get table() {
    return 'orders'
  }

  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  address() {
    return this.belongsTo('App/Models/Address', 'address_id')
  }

  setProducts(products) {
    if (products.isArray) {
      return JSON.stringify(products);
    }
  }

  static scopeRelations(query) {
    return query.with('creator')
  }

  static scopeOwn(query, auth) {
    return query.where('created_by', auth.user.id)
  }
  static scopeFilter(query, request) {
    if (request.created_by != '' && request.created_by != undefined) {
      return query.where('created_by', request.created_by)
    }
  }
  static scopeSort(query, request) {
    if (request.order_field != '' && request.order_field != undefined && request.order_value != '' && request.order_value != undefined) {
      return query.orderBy(request.order_field, request.order_value)
    } else {
      return query.orderBy('id', 'desc');
    }
  }
}

module.exports = Order
