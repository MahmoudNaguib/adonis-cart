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
const Model = use('App/Models/Post');


class PostsSeeder {
  async run() {
    console.log('Seeding posts');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE posts AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    const Section = use('App/Models/Section');
    let sections = await Section.query().active().select(['id']).fetch();
    if (sections) {
      sections = sections.toJSON();
      for (let i = 0; i < sections.length; i++) {
        await Factory.model('App/Models/Post').createMany(5, {section_id: sections[i].id});
      }
    }
  }
}

module.exports = PostsSeeder
