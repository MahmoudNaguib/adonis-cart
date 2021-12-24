'use strict'
const Common = use('App/Helpers/Common');

class AdminUpdateStatus {
  get rules () {
    return {
      status:'required|in:Pending,Confirmed,Cancelled,In-Progress,In-Shipment,Delivered,Returned',
    }
  }
  get messages(){
    return{
      'order_status.in':'Field must value of the following: Pending,Confirmed,Cancelled,In-Progress,In-Shipment,Delivered,Returned'
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
