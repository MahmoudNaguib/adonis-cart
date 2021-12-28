'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Resource = 'OrderResource';
const Model = use('App/Models/Order');
const AddressModel = use('App/Models/Address');
const CartModel = use('App/Models/Cart');
const NotificationModel = use('App/Models/Notification');
const Shopping = use('App/Helpers/Shopping');

class OrdersController {
  async index({request, response, auth}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().own(auth).relations().sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows, Resource);
  }

  async show({params, request, response, auth}) {
    let row = await Model.query().relations().own(auth).where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: Transformers.resource(row, Resource)
    })
  }

  async store({params, request, response, auth}) {
    let address = await AddressModel.query().own(auth).where('id', request.input('address_id')).first();
    if (!address) {
      return response.status(404).json({'message': 'Address not found'})
    }
    let products = await CartModel.query().own(auth).select(['product_id', 'quantity']).fetch();
    if (products.toJSON().length == 0) {
      return response.status(400).json({'message': 'There is no products in the cart'})
    }
    let row = await Shopping.createOrder(auth.user.id, request.input('address_id'), products.toJSON(), request.input('contact_name'), request.input('contact_mobile'));
    if(row){
      row = await Model.query().relations().own(auth).where('id', row.id).first();
      if (row) {
        //////////////////// Delete Cart
        await CartModel.query().own(auth).delete();
        ///////////////////////////

        return response.status(201).json({
          message: "Created successfully",
          data: Transformers.resource(row, Resource)
        })
      }
    }
    return response.status(400).json({message: "Failed to save"});
  }
}

module.exports = OrdersController
