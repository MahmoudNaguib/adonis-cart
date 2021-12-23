'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsAdmin {
  async handle ({ request,response,auth }, next) {
    try {
      await auth.check();
    } catch (error) {
      return response.status(401).json({'message': "You are not logged in"})
    }
    let row=auth.user;
    if(row.type!='Admin'){
      return response.status(401).json({'message': "You are not allowed to access this page, Only for admins"})
    }
    await next();
  }
}

module.exports = IsAdmin
