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
const Model = use('App/Models/Comment');

class CommentsSeeder {
  async run() {
    console.log('Seeding comments');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE comments AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    const Post = use('App/Models/Post');
    let posts = await Post.query().active().select(['id']).fetch();
    if(posts){
      posts=posts.toJSON();
      for(let i=0; i<posts.length; i++){
        await Factory.model('App/Models/Comment').createMany(5,{post_id:posts[i].id});
      }
    }
  }
}

module.exports = CommentsSeeder
