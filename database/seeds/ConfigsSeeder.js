'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory Model to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');
const Model = use('App/Models/Config');
const Env = use('Env');
const Helpers = use('Helpers')
const Common = use('App/Helpers/Common');
const ResizeImage = use('App/Helpers/ResizeImage');

const Drive = use('Drive');


class ConfigsSeeder {
  async run() {
    console.log('Seeding configs');
    /////// Save logo
    const logoLarge = await Drive.exists(Helpers.publicPath('assets/images/logo/large/')+Env.get('APP_LOGO'));
    if(logoLarge){
      await Drive.copy(Helpers.publicPath('assets/images/logo/large/')+Env.get('APP_LOGO'),
        Helpers.publicPath('uploads')+'/large/logo.png');
    }
    const logoSmall = await Drive.exists(Helpers.publicPath('assets/images/logo/small/')+Env.get('APP_LOGO'));
    if(logoSmall){
      await Drive.copy(Helpers.publicPath('assets/images/logo/small/')+Env.get('APP_LOGO'),
        Helpers.publicPath('uploads')+'/small/logo.png');
    }
    return;
    /////////////////////
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE configs AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    const object1 = new Model()
    object1.label = 'Application name'
    object1.key = 'app_name'
    object1.value = Env.get('APP_NAME')
    await object1.save();

    const object2 = new Model()
    object2.label = 'Logo'
    object2.key = 'logo'
    object2.value = Env.get('APP_LOGO')
    await object2.save();

    const object3 = new Model()
    object3.label = 'Facebook link'
    object3.key = 'facebook_link'
    object3.value = Env.get('APP_FACEBOOK')
    await object3.save()

    const object4 = new Model()
    object4.label = 'Twitter link'
    object4.key = 'twitter_link'
    object4.value = Env.get('APP_TWITTER')
    await object4.save()

    const object5 = new Model()
    object5.label = 'Linkedin link'
    object5.key = 'linkedin_link'
    object5.value = Env.get('APP_LINKEDIN')
    await object5.save()


    const object6 = new Model()
    object6.label = 'Youtube link'
    object6.key = 'youtube_link'
    object6.value = Env.get('APP_YOUTUBE')
    await object6.save()

    const object7 = new Model()
    object7.label = 'Contact email'
    object7.key = 'email'
    object7.value = Env.get('APP_EMAIL')
    await object7.save()
  }
}

module.exports = ConfigsSeeder
