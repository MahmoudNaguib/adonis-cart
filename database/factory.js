'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Env = use('Env');
const Common = use('App/Helpers/Common');
const User = use('App/Models/User');
const Section = use('App/Models/Section');
const Post = use('App/Models/Post');
const Country = use('App/Models/Country');
const Category = use('App/Models/Category');
const Product = use('App/Models/Product');
const Helpers = use('Helpers')
const ResizeImage = use('App/Helpers/ResizeImage');
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker,i,data) => {
  let image = await ResizeImage.resize(Helpers.publicPath('assets/images/users/')+Common.getRandomInteger(1,10)+'.png',{small: '150x150', large: '300x300'});
  return {
    type:'Guest',
    name: faker.name(),
    email: faker.email(),
    mobile: '012282'+Common.getRandomInteger(10000,99999),
    password: await Hash.make('demo@12345'),
    image:image,
    confirmed:1,
    is_active:1,
  }
})

const Hash = use('Hash')
Factory.blueprint('App/Models/Token', async (faker,i,data) => {
  return {
    user_id:Common.getRandomInteger(1,5),
    token: Common.generateString(128),
    type: 'api_token',
  }
})


Factory.blueprint('App/Models/Section', async (faker,i,data) => {
  let image = await ResizeImage.resize(Helpers.publicPath('assets/images/samples/')+Common.getRandomInteger(1,15)+'.png');
  return {
    title:'Section '+faker.sentence({ words: 3 }),
    image:image,
    is_active:1,
    created_by:1
  }
})

Factory.blueprint('App/Models/Post', async (faker,i,data) => {
  let image = await ResizeImage.resize(Helpers.publicPath('assets/images/samples/')+Common.getRandomInteger(1,15)+'.png');
  let section_id;
  if(data.section_id){
    section_id=data.section_id;
  }
  else{
    let randomRecord = await Section.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomRecord){
      section_id=randomRecord.id;
    }
  }

  let created_by;
  if(data.created_by){
    created_by=data.created_by;
  }
  else{
    let randomRecord = await User.query().active().admin().select(['id']).orderByRaw("RAND()").first();
    if(randomRecord){
      created_by=randomRecord.id;
    }
  }
  let title='Post '+faker.sentence({ words: 5 });
  let tags = [];
  for (let i = 0; i < Common.getRandomInteger(2,10); i++) {
    tags.push('tag '+ (i+1));
  }
  return {
    section_id:section_id,
    title: title,
    content: faker.paragraph(),
    image:image,
    tags:tags,
    meta_keywords:tags.join(', '),
    meta_description:title,
    is_active:1,
    created_by:1
  }
})

Factory.blueprint('App/Models/Comment', async (faker,i,data) => {
  let post_id;
  if(data.post_id){
    post_id=data.post_id;
  }
  else{
    let randomRecord = await Post.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomRecord){
      post_id=randomRecord.id;
    }
  }
  let created_by;
  if(data.created_by){
    created_by=data.created_by;
  }
  else{
    let randomRecord = await User.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomRecord){
      created_by=randomRecord.id;
    }
  }

  return {
    post_id:post_id,
    content: faker.paragraph(),
    created_by:created_by,
    is_active:1
  }
})

Factory.blueprint('App/Models/Message', async (faker,i,data) => {
  return {
    name: faker.name(),
    email: faker.email(),
    content: faker.sentence({ words: 20 }),
  }
})

Factory.blueprint('App/Models/Country', async (faker,i,data) => {
  return {
    iso: faker.string({ length: 2 }),
    title: faker.string({ length: 8 }),
    is_active: 1,
  }
})

Factory.blueprint('App/Models/Notification', async (faker,i,data) => {
  let user_id;
  if(data.user_id){
    user_id=data.user_id;
  }
  else{
    let randomUser = await User.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomUser){
      user_id=randomUser.id;
    }
  }
  return {
    user_id:user_id,
    content: 'Notification '+faker.sentence({ words: 20 }),
    entity_type:null,
    entity_id:null,
    send_email:0,
    send_push:0
  }
})

Factory.blueprint('App/Models/Address', async (faker,i,data) => {
  let country_id;
  if(data.country_id){
    country_id=data.country_id;
  }
  else{
    let randomCountry = await Country.query().select(['id']).orderByRaw("RAND()").first();
    if(randomCountry){
      country_id=randomCountry.id;
    }
  }
  let created_by;
  if(data.created_by){
    created_by=data.created_by;
  }
  else{
    let randomUser = await User.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomUser){
      created_by=randomUser.id;
    }
  }

  return {
    title: 'Address '+Common.getRandomInteger(1,15)+' User ID'+created_by,
    country_id:country_id,
    city: 'City '+faker.sentence({ words: 2 }),
    district: 'District '+faker.sentence({ words: 3 }),
    zip_code: Common.getRandomInteger(1000,9999),
    address:'District '+faker.sentence({ words: 8 }),
    notes:'Notes '+faker.sentence({ words: 8 }),
    created_by:created_by,
  }
})

Factory.blueprint('App/Models/Category', async (faker,i,data) => {
  let image = await ResizeImage.resize(Helpers.publicPath('assets/images/samples/')+Common.getRandomInteger(1,15)+'.png');
  return {
    parent_id:(data.parent_id)?data.parent_id:null,
    title: "Category "+faker.sentence({ words: 4 }),
    image:image,
    is_active:1,
    created_by:1
  }
})

Factory.blueprint('App/Models/Product', async (faker,i,data) => {
  let image = await ResizeImage.resize(Helpers.publicPath('assets/images/samples/')+Common.getRandomInteger(1,15)+'.png');
  let category_id;
  if(data.category_id){
    category_id=data.category_id;
  }
  else{
    let randomCategory = await Category.query().active().whereNot('parent_id',null).select(['id','title']).orderByRaw("RAND()").first();
    if(randomCategory){
      category_id=randomCategory.id;
    }
  }
  return {
    category_id:category_id,
    title: 'Product '+faker.sentence({ words: 5 }),
    content: faker.paragraph(),
    price: Common.getRandomInteger(10,100),
    image:image,
    meta_keywords:'keyword'+Common.getRandomInteger(1,100),
    meta_description:'meta description '+Common.getRandomInteger(1,100),
    is_active:1,
    created_by:1
  }
})

Factory.blueprint('App/Models/Favourite', async (faker,i,data) => {
  let product_id;
  if(data.product_id){
    product_id=data.product_id;
  }
  else{
    let randomProduct = await Product.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomProduct){
      product_id=randomProduct.id;
    }
  }
  let created_by;
  if(data.created_by){
    created_by=data.created_by;
  }
  else{
    let randomUser = await User.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomUser){
      created_by=randomUser.id;
    }
  }

  return {
    product_id:product_id,
    created_by:created_by,
  }
})

Factory.blueprint('App/Models/Cart', async (faker,i,data) => {
  let product_id;
  if(data.product_id){
    product_id=data.product_id;
  }
  else{
    let randomProduct = await Product.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomProduct){
      product_id=randomProduct.id;
    }
  }
  let created_by;
  if(data.created_by){
    created_by=data.created_by;
  }
  else{
    let randomUser = await User.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomUser){
      created_by=randomUser.id;
    }
  }

  return {
    product_id:product_id,
    quantity:1,
    created_by:created_by,
  }
})


Factory.blueprint('App/Models/Order', async (faker,i,data) => {
  let created_by;
  let randomUser;
  if(data.created_by){
    created_by=data.created_by;
    randomUser = await User.find(created_by);
  }
  else{
    randomUser = await User.query().active().select(['id']).orderByRaw("RAND()").first();
    if(randomUser){
      created_by=randomUser.id;
    }
  }
  let address_id;
  let randomAddress;
  if(data.address_id){
    address_id=data.address_id;
    randomUser = await Address.find(address_id);
  }
  else{
    randomAddress = await Address.query().where('created_by',created_by).orderByRaw("RAND()").first();
    if(randomAddress){
      address_id=randomAddress.id;
    }
  }
  let country=await randomAddress.country().fetch();
  let full_address=country.title+', '+randomAddress.city+', '+randomAddress.district+', '+randomAddress.zip_code+'<br>'+randomAddress.address;
  let total=100;
  return {
    created_by:created_by,
    address_id:address_id,
    full_address:full_address,
    contact_name:randomUser.name,
    contact_mobile:randomUser.mobile,
    status:Env.get('ORDER_STATUS'),
    total:total,
  }
})
