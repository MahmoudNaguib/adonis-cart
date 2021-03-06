'use strict'
const Common = use('App/Helpers/Common');

class Create {
  get rules () {
    return {
      address_id: 'required|integer',
      contact_name:'required',
      contact_mobile:'required'
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
