'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Resource = 'OrderResource';
const Model = use('App/Models/Order');

class OrdersController {
  async index({request, response, auth}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().relations().filter(request.all()).sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows, Resource);
  }

  async show({params, request, response, auth}) {
    let row = await Model.query().relations().where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: Transformers.resource(row, Resource)
    })
  }

  async destroy({params, request, response}) {
    let row = await Model.findOrFail(params.id);
    if (await row.delete()) {
      return response.json({
        message: "Delete successfully",
      })
    }
  }

  async update({params, request, response}) {
    let row = await Model.findOrFail(params.id);
    row.status = request.input('status');
    await row.save();
    return response.json({
      message: "Update successfully",
      data: Transformers.resource(row, Resource)
    })
  }

}

module.exports = OrdersController
