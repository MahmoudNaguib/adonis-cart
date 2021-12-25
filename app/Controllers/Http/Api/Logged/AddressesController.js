'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Model = use('App/Models/Address');
const Resource = 'AddressResource';

class AddressesController {
  async index({request, response, auth}) {
    let page = (request.input('page')) ? request.input('page') : 1
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
    let rows = await Model.query().own(auth).sort(request.all()).pair('id', 'title')
    return response.json({
      'data': rows
    })
  }

  async store({params, request, response, auth}) {
    let data = request.only([
      'title',
      'country_id',
      'city',
      'district',
      'address',
      'zip_code',
      'notes'
    ]);
    data.created_by = auth.user.id;
    let row = await Model.create(data);
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
      'title',
      'country_id',
      'city',
      'district',
      'address',
      'zip_code',
      'notes'
    ]);
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
}


module.exports = AddressesController
