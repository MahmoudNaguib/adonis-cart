'use strict'
const Common = use('App/Helpers/Common');

class ProfileUpdate {
  get rules () {
    return {
      name:'required|min:4',
      email: 'required|email',
      mobile:'required|number',
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

module.exports = ProfileUpdate
