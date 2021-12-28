'use strict'
const Common = use('App/Helpers/Common');

class Edit {
  get rules () {
    return {
      product_id: 'required|integer',
      quantity: 'required|integer',
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

module.exports = Edit
