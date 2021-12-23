'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Resource = 'SectionResource';
const Model = use('App/Models/Section');

class SectionsController {
  async index({request, response}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().active().paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows, Resource);
  }

  async show({params, request, response}) {
    let row = await Model.query().active().where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: Transformers.resource(row, Resource)
    })
  }

  async pairs({response}) {
    let rows = await Model.query().active().pair('id', 'title')
    return response.json({
      'data': rows
    })
  }
}

module.exports = SectionsController
