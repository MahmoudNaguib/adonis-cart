'use strict'
const Common = use('App/Helpers/Common');
const { validate } = use('Validator')

class ChangePassword {
  get rules () {
    return {
      old_password: 'required|min:8',
      password: 'required|min:8|confirmed',
    }
  }
  async fails (errorMessages) {
    const errors=Common.validationMessages(errorMessages);
    return errorMessages;
    this.ctx.session
      .withErrors(errorMessages)
      .flashExcept(['password'])
    return response.redirect('back')
    /*const errors=Common.validationMessages(errorMessages);
    return this.ctx.response.json({'errors':errors},422);*/
  }
  get validateAll () {
    return true
  }
}

module.exports = ChangePassword
