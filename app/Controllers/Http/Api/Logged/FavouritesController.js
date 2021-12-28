'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Resource = 'FavouriteResource';
const Model = use('App/Models/Favourite');
const ProductModel = use('App/Models/Product');

class FavouritesController {
  async index({request, response, auth}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().relations().own(auth).sort(request.all()).paginate(page, Env.get('PER_PAGE'));
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

  async pairs({response, request, auth}) {
    let rows = await Model.query().own(auth).sort(request.all()).pair('id', 'product_id')
    return response.json({
      'data': rows
    })
  }

  async store({params, request, response, auth}) {
    let data = request.only([
      'product_id',
    ]);
    ///////////////////////////// Check if product is exist
    let product = await ProductModel.query().active().where('id', request.input('product_id')).first();
    if (!product) {
      return response.status(404).json({'message': 'Product not found'})
    }
    ////////////////////////////
    let row = await Model.query().relations().own(auth).where('product_id', request.input('product_id')).first();
    if(!row){
      data.created_by = auth.user.id;
      row = await Model.create(data);
      row = await Model.query().relations().own(auth).where('id', row.id).first();
    }
    if (row) {
      return response.status(201).json({
        message: "Created successfully",
        data: Transformers.resource(row, Resource)
      })
    }
    return response.status(400).json({message: "Failed to save"});
  }

  async destroy({params, request, response, auth}) {
    let row = await Model.query().own(auth).where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    if (await row.delete()) {
      return response.json({
        message: "Delete successfully",
      })
    }
  }
}

module.exports = FavouritesController
