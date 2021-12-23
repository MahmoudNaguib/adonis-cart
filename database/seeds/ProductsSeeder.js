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
const Model = use('App/Models/Product');
const Helpers = use('Helpers')
const ResizeImage = use('App/Helpers/ResizeImage');

class ProductsSeeder {
  async run () {
    console.log('Seeding products');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE products AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    const Category = use('App/Models/Category');
    let categories = await Category.query().active().whereNot('parent_id',null).select(['id','title']).fetch();
    if(categories){
      categories=categories.toJSON();
      for(let i=0; i<categories.length; i++){
        await Factory.model('App/Models/Product').createMany(5,{category_id:categories[i].id});
      }
    }
  }
}

module.exports = ProductsSeeder
