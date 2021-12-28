'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Env = use('Env');
const Model = use('Model')
const NotificationModel = use('App/Models/Notification');

class Order extends Model {
  static get table() {
    return 'orders'
  }

  static boot() {
    super.boot()
    this.addHook('afterCreate', async (row) => {
      //////////////////////// Create Notification
      await NotificationModel.create({
        user_id: row.created_by,
        content: "New order has been created",
        entity_type: "orders",
        entity_id: row.id,
        send_email: Env.get('SEND_ORDER_NOTIFICATION_EMAIL'),
        send_push: 0
      });
      /////////////////////////
    })
  }

  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  address() {
    return this.belongsTo('App/Models/Address', 'address_id')
  }

  setProducts(products) {
    if (products) {
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
