'use strict';
const Order = use('App/Models/Order');
const User = use('App/Models/User');
const Product = use('App/Models/Product');
const Address = use('App/Models/Address');
const Env = use('Env');

class Shopping {
  static async createOrder(userId, addressId, products,contact_name,contact_mobile) {
    let user = await User.query().active().where('id',userId).first();
    user=user.toJSON();
    if(user){
      if(products.length>0){
        let total=0;
        let productList=[];
        for (let i = 0; i < products.length; i++) {
          let product=await Product.query().active().select(['id','category_id','title','price','image']).where('id',products[i].product_id).first();
          total+=products[i].quantity*product.price;
          productList.push(product.toJSON());
        }
        let address = await Address.query().with('country').where('id',addressId).first();
        address=address.toJSON();
        if(address){
          let full_address=address.country.title+', '+address.city+', '+address.district+', '+address.zip_code+'<br>'+address.address;
          let data={
            address_id:address.id,
            full_address:full_address,
            contact_name:contact_name,
            contact_mobile:contact_mobile,
            products:productList,
            total:total,
            status:Env.get('ORDER_STATUS'),
            created_by:user.id
          }
          let row= await Order.create(data);
          return row.toJSON();
        }
      }
    }
  }
}

module.exports = Shopping;
