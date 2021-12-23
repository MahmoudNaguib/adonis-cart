'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Model = use('App/Models/Cart');
const Resource='CartResource';

class CartController {
  async index({request, response, transform, auth}) {
    let rows = await Model.query().relations().own(auth).sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows,Resource);
  }

  async show({params, request, response, transform, auth}) {
    let row = await Model.query().relations().own(auth).where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: Transformers.resource(row,Resource)
    })
  }
}

module.exports = CartController
