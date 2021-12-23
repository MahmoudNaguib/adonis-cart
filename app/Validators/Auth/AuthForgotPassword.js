'use strict'
const Common = use('App/Helpers/Common');

class AuthForgotPassword {
  get rules () {
    return {
      email: 'required|email',
    }
  }
  async fails (errorMessages) {
    const errors=Common.validationMessages(errorMessages);
    return this.ctx.response.json({'errors':errors},422);
  }
  get validateAll () {
    return true
  }
}

module.exports = AuthForgotPassword
