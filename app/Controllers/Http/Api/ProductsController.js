'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Resource = 'ProductResource';
const Model = use('App/Models/Product');

class ProductsController {
  async index({request, response, transform}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().relations().active().filter(request.all()).sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows, Resource);
  }

  async show({params, request, response, transform}) {
    let row = await Model.query().relations().active().where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: Transformers.resource(row, Resource)
    })
  }
}

module.exports = ProductsController
