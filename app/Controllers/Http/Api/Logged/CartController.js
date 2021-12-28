'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Model = use('App/Models/Cart');
const ProductModel = use('App/Models/Product');
const Resource='CartResource';

class CartController {
  async index({request, response, auth}) {
    let page = (request.input('page')) ? request.input('page') : 1
    let rows = await Model.query().relations().own(auth).sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows,Resource);
  }

  async show({params, request, response, auth}) {
    let row = await Model.query().relations().own(auth).where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: Transformers.resource(row,Resource)
    })
  }

  async store({params, request, response, auth}) {
    let data = request.only([
      'product_id',
      'quantity',
    ]);
    ///////////////////////////// Check if product is exist
    let product = await ProductModel.query().active().where('id', request.input('product_id')).first();
    if (!product) {
      return response.status(404).json({'message': 'Product not found'})
    }
    ////////////////////////////
    let row = await Model.query().own(auth).where('product_id', request.input('product_id')).first();
    if(row){
        row.quantity=row.quantity+1;
        await row.save();
    }
    else{
      data.created_by = auth.user.id;
      row = await Model.create(data);
    }
    row = await Model.query().relations().own(auth).where('id', row.id).first();
    if (row) {
      return response.status(201).json({
        message: "Created successfully",
        data: Transformers.resource(row, Resource)
      })
    }
    return response.status(400).json({message: "Failed to save"});
  }
  async update({params, request, response, auth}) {
    let row = await Model.query().own(auth).where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    let data = request.only([
      'product_id',
      'quantity',
    ]);
    ///////////////////////////// Check if product is exist
    let product = await ProductModel.query().active().where('id', request.input('product_id')).first();
    if (!product) {
      return response.status(404).json({'message': 'Product not found'})
    }
    ////////////////////////////
    row.merge(data);
    if (await row.save()) {
      row = await Model.query().relations().own(auth).where('id', row.id).first();
      return response.json({
        message: "Update successfully",
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

module.exports = CartController
