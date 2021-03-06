'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Resource = 'NotificationResource';
const Model = use('App/Models/Notification');


class NotificationsController {
  async index({request, response, auth}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let rows = await Model.query().own(auth).sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows, Resource);
  }

  async show({params, request, response, auth}) {
    let row = await Model.query().own(auth).where('id', params.id).first();
    if (!row) {
      return response.status(404).json({'message': 'Page not found'})
    }
    return response.json({
      data: Transformers.resource(row, Resource)
    })
  }
}

module.exports = NotificationsController
