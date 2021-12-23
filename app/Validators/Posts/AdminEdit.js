'use strict'
const Common = use('App/Helpers/Common');

class AdminEdit {
  get rules () {
    return {
      section_id:'required',
      title:'required|min:4',
      content: 'required:min:4',
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

module.exports = AdminEdit
