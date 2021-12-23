'use strict'
const Model = use('App/Models/User');


class AuthController {
  async confirm({params, request, response, view}) {
    let row = await Model.query().where('confirm_token', params.token).first();
    return view.render('auth.confirm',{row})
  }

}

module.exports = AuthController
