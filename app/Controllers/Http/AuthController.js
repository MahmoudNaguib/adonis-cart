'use strict'
const Model = use('App/Models/User');
const Common = use('App/Helpers/Common');
const {validate} = use('Validator')

class AuthController {
  async confirm({params, request, response, view}) {
    let row = await Model.query().where('confirm_token', params.token).first();
    if (row) {
      row.confirmed = 1;
      row.confirm_token = null;
      row.save();
    }
    return view.render('auth.confirm', {row})
  }

  async getChangePassword({params, request, response, view}) {
    let row = await Model.query().where('password_token', params.token).first();
    return view.render('auth.change-password', {row})
  }

  async postChangePassword({params, request, session, response, view}) {
    const rules = {
      old_password: 'required|min:8',
      password: 'required|min:8|confirmed',
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      const errors=Common.validationMessages(validation.messages());
      return errors;
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }
    let row = await Model.query().where('password_token', params.token).first();
    return row.name;
    return view.render('auth.change-password', {row})
  }

}

module.exports = AuthController
