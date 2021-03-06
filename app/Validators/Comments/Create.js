'use strict'
const Common = use('App/Helpers/Common');

class Create {
  get rules () {
    return {
      content: 'required|min:4',
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

module.exports = Create
