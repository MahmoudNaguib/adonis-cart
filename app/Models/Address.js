'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
  static get table() {
    return 'addresses'
  }

  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  country() {
    return this.belongsTo('App/Models/Country', 'country_id')
  }

  static scopeRelations(query) {
    return query.with('country')
  }

  static scopeOwn(query, auth) {
    return query.where('created_by', auth.user.id)
  }

  static scopeSort(query, request) {
    if (request.order_field != '' && request.order_field != undefined && request.order_value != '' && request.order_value != undefined) {
      return query.orderBy(request.order_field, request.order_value)
    } else {
      return query.orderBy('id', 'desc');
    }
  }
}

module.exports = Address
