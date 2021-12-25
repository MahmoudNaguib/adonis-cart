'use strict'
const Common = use('App/Helpers/Common');

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
    return this.ctx.response.json({'errors':errors},422);
  }
  get validateAll () {
    return true
  }
}

module.exports = ChangePassword
