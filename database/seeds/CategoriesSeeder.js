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
const Model = use('App/Models/Category');
const Helpers = use('Helpers')
const ResizeImage = use('App/Helpers/ResizeImage');

class CategoriesSeeder {
  async run() {
    console.log('Seeding categories');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE categories AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    await Factory.model('App/Models/Category').createMany(5);
    let rows = await Model.query().active().select(['id', 'title']).fetch();
    if (rows) {
      rows = rows.toJSON();
      for (let i = 0; i < rows.length; i++) {
        await Factory.model('App/Models/Category').createMany(3,{parent_id:rows[i].id});
      }
    }
  }
}

module.exports = CategoriesSeeder
