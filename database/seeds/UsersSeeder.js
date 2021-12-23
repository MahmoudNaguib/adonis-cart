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
const Model = use('App/Models/User');
const Env = use('Env');
const Helpers = use('Helpers');
const ResizeImage = use('App/Helpers/ResizeImage');
const Common = use('App/Helpers/Common');

class UsersSeeder {
  async run() {
    console.log('Seeding users');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE users AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    /////// Save image
    let image;
    let data;
    image = await ResizeImage.resize(Helpers.publicPath('assets/images/users/')+'admin.png',
      {small: '150x150', large: '300x300'});
    /////////////////////
    data={
      type:'Admin',
      name:'Admin',
      email:'admin@demo.com',
      mobile:'01228277204',
      image:image,
      password:Env.get('DEFAULT_PASSWORD'),
      confirmed :'1',
      is_active :'1',
    }
    await Model.create(data);
    //////////////////////////////
    /////// Save image
    image = await ResizeImage.resize(Helpers.publicPath('assets/images/users/')+Common.getRandomInteger(1,10)+'.png',
      {small: '150x150', large: '300x300'});
    /////////////////////
    data={
      type:'Guest',
      name:'User1',
      email:'user1@demo.com',
      mobile:'01228277204',
      image:image,
      password:Env.get('DEFAULT_PASSWORD'),
      confirmed :'1',
      is_active :'1',
    }
    await Model.create(data);
    await Factory.model('App/Models/User').createMany(3);
  }
}

module.exports = UsersSeeder
