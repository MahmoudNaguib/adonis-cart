'use strict'
const Common = use('App/Helpers/Common');

class AuthRegister {
  get rules() {
    return {
      name: 'required|min:4',
      email: 'required|email|unique:users,email',
      mobile: 'required|number',
      password: 'required|min:6|confirmed',
    }
  }

  async fails(errorMessages) {
    const errors = Common.validationMessages(errorMessages);
    return this.ctx.response.json({'errors': errors}, 422);
  }

  get validateAll() {
    return true
  }
}

module.exports = AuthRegister
