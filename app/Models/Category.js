'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  products() {
    return this.hasMany('App/Models/Product')
  }

  children() {
    return this.hasMany('App/Models/Category', 'id', 'parent_id').active()
  }

  static scopeActive(query) {
    return query.where('is_active', 1)
  }

  static scopeRelations(query) {
    return query.with('children')
  }

  static scopeSort(query, request) {
    if (request.order_field != '' && request.order_field != undefined && request.order_value != '' && request.order_value != undefined) {
      return query.orderBy(request.order_field, request.order_value)
    } else {
      return query.orderBy('id', 'desc');
    }
  }
}

module.exports = Category
