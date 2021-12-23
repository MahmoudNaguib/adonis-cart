'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Section extends Model {
  static get table() {
    return 'sections'
  }

  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  posts() {
    return this.hasMany('App/Models/Post')
  }

  static scopeActive(query) {
    return query.where('is_active', 1)
  }

  static scopeSort(query, request) {
    if (request.order_field != '' && request.order_field != undefined && request.order_value != '' && request.order_value != undefined) {
      return query.orderBy(request.order_field, request.order_value)
    } else {
      return query.orderBy('id', 'desc');
    }
  }
}

module.exports = Section
