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
const Helpers = use('Helpers');
const Factory = use('Factory');
const Database = use('Database');
const Model = use('App/Models/Country');

class CountriesSeeder {
  async run() {
    console.log('Seeding countries');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE countries AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    let countriesData = require(Helpers.publicPath('countries.json'));
    if (countriesData) {
      for (let i = 0; i < countriesData.length; i++) {
        let object = new Model();
        object.iso = countriesData[i].code
        object.dial_code = countriesData[i].dial_code
        object.title = countriesData[i].name
        object.created_by = 1
        await object.save()
      }
    }
  }
}

module.exports = CountriesSeeder
