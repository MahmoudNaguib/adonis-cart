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
const Model = use('App/Models/Message');

class MessagesSeeder {
   async run () {
     console.log('Seeding messages');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE messages AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    await Factory.model('App/Models/Message').createMany(5)
  }
}

module.exports = MessagesSeeder
