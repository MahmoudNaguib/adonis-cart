'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
  static get table () {
    return 'addresses'
  }
  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }
  country() {
    return this.belongsTo('App/Models/Country', 'country_id')
  }
}

module.exports = Address
