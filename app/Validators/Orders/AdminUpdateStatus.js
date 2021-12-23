'use strict'
const Common = use('App/Helpers/Common');

class AdminUpdateStatus {
  get rules () {
    return {
      status:'required',
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

module.exports = AdminUpdateStatus
