'use strict'
const Common = use('App/Helpers/Common');

class AuthLogin {
  get rules() {
    return {
      email: 'required|email',
      password: 'required|min:8',
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

module.exports = AuthLogin
