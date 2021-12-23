'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  category() {
    return this.belongsTo('App/Models/Category')
  }
  static scopeRelations(query) {
    return query.with('creator').with('category')
  }
  static scopeActive(query) {
    return query.where('is_active', 1)
  }
  static scopeFilter(query,request) {
    if(request.category_id!='' && request.category_id!=undefined){
      return query.where('category_id', request.category_id)
    }
  }
  static scopeSort(query,request) {
    if(request.order_field!='' && request.order_field!=undefined && request.order_value!='' && request.order_value!=undefined){
      return query.orderBy(request.order_field,request.order_value)
    }
    else{
      return query.orderBy('id', 'desc');
    }
  }
}

module.exports = Product
