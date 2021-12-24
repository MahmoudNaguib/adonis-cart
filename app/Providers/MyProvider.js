const { ServiceProvider } = require('@adonisjs/fold')

class MyProvider extends ServiceProvider {
  register () {
    // register bindings
  }

  async boot () {
    const Database = use('Database');
  /*  const Model = use('App/Models/Config');
    let rows = await Model.all();*/
    const View = this.app.use('Adonis/Src/View');
    const Env = use('Env');


    View.global('baseUrl', Env.get('APP_URL'));
    View.global('currentYear',new Date().getFullYear());
    View.global('appName', Env.get('APP_NAME'));
    View.global('appLogo', Env.get('APP_LOGO'));
    View.global('appFacebook', Env.get('APP_FACEBOOK'));
    View.global('appTwitter', Env.get('APP_TWITTER'));
    View.global('appLinkedin', Env.get('APP_LINKEDIN'));
    View.global('appYoutube', Env.get('APP_YOUTUBE'));
    View.global('appEmail', Env.get('APP_EMAIL'));
  }
}

module.exports = MyProvider
