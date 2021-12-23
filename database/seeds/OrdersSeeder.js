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
const Model = use('App/Models/Order');
const Address = use('App/Models/Address');
const Product = use('App/Models/Product');
const Shopping = use('App/Helpers/Shopping');
class OrdersSeeder {
  async run() {
    console.log('Seeding orders');
    await Model
      .query()
      .delete();
    await Database
      .raw('ALTER TABLE orders AUTO_INCREMENT = 1')
    ///////////////////////////////////////////////////////
    let User = use('App/Models/User');
    let users = await User.query().active().fetch();
    if (users) {
      users = users.toJSON(); // users.length
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j< 2; j++) {
          let address = await Address.query().where('created_by',users[i].id).orderByRaw("RAND()").first();
          let productsIds = await Product.query().active().select(['id']).orderByRaw("RAND()").limit(2).ids();
          if(address){
            let order=await Shopping.createOrder(users[i].id,address.id,productsIds,users[i].name,users[i].mobile);
          }
        }
      }
    }
  }
}

module.exports = OrdersSeeder
