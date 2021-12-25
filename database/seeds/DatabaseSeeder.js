'use strict';

const Users = use('./UsersSeeder');
const Sections = use('./SectionsSeeder');
const Posts = use('./PostsSeeder');
const Comments = use('./CommentsSeeder');

const Messages = use('./MessagesSeeder');
const Countries = use('./CountriesSeeder');
const Notifications = use('./NotificationsSeeder');
const Addresses = use('./AddressesSeeder');
const Categories = use('./CategoriesSeeder');
const Products = use('./ProductsSeeder');
const Favourites = use('./FavouritesSeeder');
const Cart = use('./CartSeeder');
const Orders = use('./OrdersSeeder');

class DatabaseSeeder {
  async run() {
    await new Users().run();
    await new Sections().run();
    await new Posts().run();
    await new Comments().run();
    await new Messages().run();
    await new Countries().run();
    await new Notifications().run();
    await new Addresses().run();
    await new Categories().run();
    await new Products().run();
    await new Favourites().run();
    await new Cart().run();
    await new Orders().run();
  }
}

module.exports = DatabaseSeeder
