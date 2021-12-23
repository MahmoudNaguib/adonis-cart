'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Country extends Model {
  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  static scopeActive(query) {
    return query.where('is_active', 1)
  }
}

module.exports = Country
