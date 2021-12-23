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
const Model = use('App/Models/Section');

class SectionsSeeder {
  async run() {
    console.log('Seeding sections');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE sections AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    await Factory.model('App/Models/Section').createMany(3);
  }
}

module.exports = SectionsSeeder
