'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Model = use('App/Models/Category');
const Resource='CategoryResource';

class CategoriesController {
  async index({request, response}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().relations().where('parent_id', null).active().sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows, Resource);
  }

  async show({params, request, response}) {
    let row = await Model.query().relations().active().where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: Transformers.resource(row,Resource)
    })
  }

  async pairs({params, request, response}) {
    let rows = await Model.query().relations().active().fetch();
    rows = rows.toJSON();
    let output = [];
    for (let i = 0; i < rows.length; i++) {
      let row = {
        'key': rows[i].title,
        'id':rows[i].id,
        'image':rows[i].image,
        'children': rows[i].children
      }
      output.push(row);
    }
    return output;
    return response.status(200).json({
      data: output
    })
  }

}

module.exports = CategoriesController
