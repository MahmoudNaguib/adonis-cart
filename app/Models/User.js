'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static get table () {
    return 'users'
  }
  static boot() {
    super.boot()
    this.addHook('beforeSave', async (model) => {
      if (model.dirty.password) {
        model.password = await Hash.make(model.password)
      }
    })
  }

  static get hidden() {
    return ['password']
  }

  creator() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  static scopeActive(query) {
    return query.where('is_active', 1)
  }
  static scopeAdmin(query) {
    return query.where('type', 'admin')
  }
}

module.exports = User
