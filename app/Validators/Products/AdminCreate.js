'use strict'
const Common = use('App/Helpers/Common');

class AdminCreate {
  get rules () {
    return {
      category_id:'required',
      title:'required|min:4',
      content: 'required:min:4',
      price:'required',
      is_active:'required'
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

module.exports = AdminCreate
