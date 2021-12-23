'use strict'
const Model = use('App/Models/Order');
const Transformer = "OrderTransformer";
const Env = use('Env');

class OrdersController {
  async index({request, response, transform, auth}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().relations().filter(request.all()).sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return transform.paginate(rows, Transformer);
  }

  async show({params, request, response, transform, auth}) {
    let row = await Model.query().relations().where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: await transform.item(row, Transformer)
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

  async update({params, request, response, transform}) {
    let row = await Model.findOrFail(params.id);
    let data = request.only(['status']);
    row.merge(data);
    if (await row.save()) {
      return response.json({
        message: "Update successfully",
        data: await transform.item(await Model.find(row.id), Transformer)
      })
    }
    return response.status(400).json({message: "Failed to save"});
  }

}

module.exports = OrdersController
