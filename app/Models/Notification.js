'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const SendNotificationEmail = use('App/Jobs/SendNotificationEmail');

class Notification extends Model {
  static boot () {
    super.boot()
    this.addHook('afterCreate', async (row) => {
      ///////////////Send email
      if(row.send_email==1){
        SendNotificationEmail.handle(row);
      }
      ///////////////
    })
  }
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
