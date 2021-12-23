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
const Model = use('App/Models/Address');

class AddressesSeeder {
  async run() {
    console.log('Seeding addresses');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE addresses AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    const User = use('App/Models/User');
    let users = await User.query().active().select(['id']).fetch();
    if (users) {
      users = users.toJSON();
      for (let i = 0; i < users.length; i++) {
        await Factory.model('App/Models/Address').createMany(2, {created_by: users[i].id});
      }
    }
    /*await Factory.model('App/Models/Favourite').createMany(5)*/
  }
}

module.exports = AddressesSeeder
