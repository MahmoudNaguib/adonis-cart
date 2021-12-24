'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {
  static get table() {
    return 'comments'
  }

  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  post() {
    return this.belongsTo('App/Models/Post', 'post_id')
  }

  static scopeRelations(query) {
    return query.with('creator').with('post')
  }

  static scopeActive(query) {
    return query.where('is_active', 1)
  }

  static scopeFilter(query, request) {
    if (request.post_id != '' && request.post_id != undefined) {
      return query.where('post_id', request.post_id)
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

module.exports = Comment
