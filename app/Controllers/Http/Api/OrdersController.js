'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Resource = 'OrderResource';
const Model = use('App/Models/Order');


class OrdersController {
  async index({request, response, transform, auth}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().own(auth).relations().sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows, Resource);
  }

  async show({params, request, response, transform, auth}) {
    let row = await Model.query().relations().own(auth).where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: Transformers.resource(row, Resource)
    })
  }
}

module.exports = OrdersController