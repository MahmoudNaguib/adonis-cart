'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  static scopeOwn(query,auth) {
    return query.where('user_id', auth.user.id)
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

module.exports = Notification
