'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  static get table() {
    return 'posts'
  }

  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  comments() {
    return this.hasMany('App/Models/Comment').orderBy('id', 'desc')
  }

  latestComments() {
    return this.hasMany('App/Models/Comment').active().orderBy('id', 'desc').limit(10)
  }

  section() {
    return this.belongsTo('App/Models/Section')
  }

  setTags(tags) {
    if (tags) {
      return JSON.stringify(tags);
    }
  }

  static scopeActive(query) {
    return query.where('is_active', 1)
  }

  static scopeRelations(query) {
    return query.with('creator').with('section')
  }

  static scopeFilter(query, request) {
    if (request.section_id != '' && request.section_id != undefined) {
      return query.where('section_id', request.section_id)
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

module.exports = Post
