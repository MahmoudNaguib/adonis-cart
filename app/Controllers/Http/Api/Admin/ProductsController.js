'use strict'
const Model = use('App/Models/Product');
const Transformer = "ProductTransformer";
const Env = use('Env');
const ResizeImage = use('App/Helpers/ResizeImage');

class ProductsController {
  async index({request, response, transform}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().relations().filter(request.all()).sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return transform.paginate(rows, Transformer);
  }

  async show({params, request, response, transform}) {
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

  async store({request, response, transform, auth}) {
    let data = request.only([
      'category_id',
      'title',
      'content',
      'price',
      'meta_keywords',
      'meta_description',
      'is_active'
    ]);
    /////// Save image
    if (request.file('image', {types: ['image'], size: '4mb'})) {
      let image = await ResizeImage.resize(request.file('image').tmpPath,
        {small: '200x100', large: '400x200'});
      if (image != undefined && image != '') {
        data.image = image;
      }
    }
    /////////////////////
    data.created_by = auth.user.id;
    let row = await Model.create(data);
    if (row) {
      return response.status(201).json({
        message: "Created successfully",
        data: await transform.item(row, Transformer)
      })
    }
    return response.status(400).json({message: "Failed to save"});
  }

  async update({params, request, response, transform}) {
    let row = await Model.findOrFail(params.id);
    let data = request.only([
      'category_id',
      'title',
      'content',
      'price',
      'meta_keywords',
      'meta_description',
      'is_active'
    ]);
    /////// Save image
    if (request.file('image', {types: ['image'], size: '4mb'})) {
      let image = await ResizeImage.resize(request.file('image').tmpPath,
        {small: '200x100', large: '400x200'});
      if (image != undefined && image != '') {
        data.image = image;
      }
    }
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

module.exports = ProductsController