'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Model = use('App/Models/Cart');
const Resource = 'CartResource';

class ConfigsController {
  async index({request, response, auth}) {
    let rows = {
      'app_name': Env.get('APP_NAME'),
      'app_logo': Env.get('APP_URL')+'/'+Env.get('APP_LOGO'),
      'app_facebook': Env.get('APP_FACEBOOK'),
      'app_twitter': Env.get('APP_TWITTER'),
      'app_linkedin': Env.get('APP_LINKEDIN'),
      'app_youtube': Env.get('APP_YOUTUBE'),
      'app_email': Env.get('APP_EMAIL'),
    };
    return response.json({
      data: rows
    })
  }
}

module.exports = ConfigsController
