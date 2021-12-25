'use strict'
const Common = use('App/Helpers/Common');

class Edit {
  get rules () {
    return {
      title: 'required|min:3',
      country_id: 'required|number',
      city: 'required|min:3',
      district: 'required|min:3',
      address: 'required|min:3',
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
