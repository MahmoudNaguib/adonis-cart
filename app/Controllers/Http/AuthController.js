'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
/////////////////////////////////////////////////
const Model = use('App/Models/User');

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

  async postChangePassword({params, request, session, auth, response, view}) {
    let row = await Model.query().where('password_token', params.token).first();
    if (!await Hash.verify(request.input('old_password'), row.password)) {
      session
        .withErrors([{field: 'old_password', message: 'Invalid old password'}])
        .flashAll()
      return response.redirect('back');
    }
    await auth.revokeTokensForUser(row, null, true);
    await auth.generate(row);
    row.password = request.input('password');
    row.password_token=null;
    if (row.save()) {
      session.flash({ message: 'Password has been changed' , type:'success'})
      return response.redirect('/');
    }
    return view.render('auth.change-password', {row})
  }

}

module.exports = AuthController
