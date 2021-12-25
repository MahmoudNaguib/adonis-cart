'use strict'
const Common = use('App/Helpers/Common');
const { validate } = use('Validator')

class ChangePassword {
  get rules () {
    return {
      old_password: 'required|min:8',
      password: 'required|min:8|confirmed',
      password_confirmation:'required'
    }
  }
  async fails (errorMessages) {
    const errors=Common.validationMessages(errorMessages);
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect('back');
  }
  get messages(){
    return{
      'old_password.required':'Field is required',
      'old_password.min':'Field must be min 8 characters',
      'password.required':'Field is required',
      'password.min':'Field must be min 8 characters',
      'password.confirmed':'Password and Password confirmation must be matched',
    }
  }
  get validateAll () {
    return true
  }
}

module.exports = ChangePassword
