'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'HomeController.index')
Route.get('/contact', 'ContactController.index')
Route.get('auth/confirm/:token', 'AuthController.confirm');
Route.get('auth/change-password/:token', 'AuthController.getChangePassword');
Route.post('auth/change-password/:token', 'AuthController.postChangePassword')
  .validator('Auth/ChangePassword');

/*
Route.get('auth/reset-password', 'AuthController.resetPassword');
*/
Route.group(() => {
  //////////////////////////////// Auth
  Route.post('auth/login', 'Api/AuthController.login')
    .validator('Auth/AuthLogin');
  Route.post('auth/register', 'Api/AuthController.register')
    .validator('Auth/AuthRegister');
  Route.post('auth/forgot-password', 'Api/AuthController.forgotPassword')
    .validator('Auth/AuthForgotPassword');
  ////////////////////////////////
}).middleware(['guest']).prefix('api');


Route.group(() => {
    Route.get('configs', 'Api/ConfigsController.index');
    //////////////////////////////// Sections
    Route.get('sections', 'Api/SectionsController.index');
    Route.get('sections/pairs', 'Api/SectionsController.pairs');
    Route.get('sections/:id', 'Api/SectionsController.show');
    /////////////////////////////////
    //////////////////////////////// Posts
    Route.get('posts', 'Api/PostsController.index');
    Route.get('posts/:id', 'Api/PostsController.show');
    Route.get('posts/:id/comments', 'Api/CommentsController.index');
    /////////////////////////////////
    //////////////////////////////// Categories
    Route.get('categories', 'Api/CategoriesController.index');
    Route.get('categories/pairs', 'Api/CategoriesController.pairs');
    Route.get('categories/:id', 'Api/CategoriesController.show');
    /////////////////////////////////
    //////////////////////////////// Products
    Route.get('products', 'Api/ProductsController.index');
    Route.get('products/:id', 'Api/ProductsController.show');
    //////////////////////////////////
  }
).prefix('api');


Route.group(() => {
    //////////////////////////////// Profile
    Route.get('profile', 'Api/Logged/ProfileController.index');
    Route.get('profile/logout', 'Api/Logged/ProfileController.logout');
    Route.put('profile', 'Api/Logged/ProfileController.update')
      .validator('Profile/ProfileUpdate');
    Route.put('change-password', 'Api/Logged/ProfileController.changePassword')
      .validator('Profile/ChangePassword');
    //////////////////////////////// Notifications
    Route.get('notifications', 'Api/Logged/NotificationsController.index');
    Route.get('notifications/:id', 'Api/Logged/NotificationsController.show');
    //////////////////////////////////
    //////////////////////////////// Cart
    Route.get('addresses', 'Api/Logged/AddressesController.index');
    Route.get('addresses/pairs', 'Api/Logged/AddressesController.pairs');
    Route.get('addresses/:id', 'Api/Logged/AddressesController.show');
    Route.post('addresses', 'Api/Logged/AddressesController.store')
      .validator('Addresses/Create');
    Route.put('addresses/:id', 'Api/Logged/AddressesController.update')
      .validator('Addresses/Edit');
    Route.delete('addresses/:id', 'Api/Logged/AddressesController.destroy');
    //////////////////////////////////
    //////////////////////////////// Cart
    Route.get('cart', 'Api/Logged/CartController.index');
    Route.get('cart/:id', 'Api/Logged/CartController.show');
    Route.post('cart', 'Api/Logged/CartController.store')
      .validator('Cart/Create');
    Route.put('cart/:id', 'Api/Logged/CartController.update')
      .validator('Cart/Edit');
    Route.delete('cart/:id', 'Api/Logged/CartController.destroy');

    //////////////////////////////////
    //////////////////////////////// Favourites
    Route.get('favourites', 'Api/Logged/FavouritesController.index');
    Route.get('favourites/pairs', 'Api/Logged/FavouritesController.pairs');
    Route.get('favourites/:id', 'Api/Logged/FavouritesController.show');
    Route.post('favourites', 'Api/Logged/FavouritesController.store')
      .validator('Favourites/Create');
    Route.delete('favourites/:id', 'Api/Logged/FavouritesController.destroy');
    //////////////////////////////////
    //////////////////////////////// Orders
    Route.get('orders', 'Api/Logged/OrdersController.index');
    Route.get('orders/:id', 'Api/Logged/OrdersController.show');
    Route.post('orders', 'Api/Logged/OrdersController.store')
      .validator('Orders/Create');
    //////////////////////////////////
    //////////// Comments
    Route.post('posts/:id/comments', 'Api/Logged/CommentsController.store')
      .validator('Comments/Create');
  }
).middleware(['auth']).prefix('api');


//////// Admin routes
Route.group(() => {
    //////////////////////////////// Posts
    Route.get('posts', 'Api/Admin/PostsController.index');
    Route.get('posts/:id', 'Api/Admin/PostsController.show');
    Route.delete('posts/:id', 'Api/Admin/PostsController.destroy');
    Route.post('posts', 'Api/Admin/PostsController.store')
      .validator('Posts/AdminCreate');
    Route.put('posts/:id', 'Api/Admin/PostsController.update')
      .validator('Posts/AdminEdit');
    /////////////////////////////////
    //////////////////////////////// Comments
    Route.get('comments', 'Api/Admin/CommentsController.index');
    Route.get('comments/:id', 'Api/Admin/CommentsController.show');
    Route.delete('comments/:id', 'Api/Admin/CommentsController.destroy');
    Route.put('comments/:id', 'Api/Admin/CommentsController.update')
      .validator('Comments/AdminUpdateStatus');
    /////////////////////////////////
    //////////////////////////////// Orders
    Route.get('orders', 'Api/Admin/OrdersController.index');
    Route.get('orders/:id', 'Api/Admin/OrdersController.show');
    Route.delete('orders/:id', 'Api/Admin/OrdersController.destroy');
    Route.put('orders/:id', 'Api/Admin/OrdersController.update')
      .validator('Orders/AdminUpdateStatus');
    //////////////////////////////////
    //////////////////////////////// Products
    Route.get('products', 'Api/Admin/ProductsController.index');
    Route.get('products/:id', 'Api/Admin/ProductsController.show');
    Route.delete('products/:id', 'Api/Admin/ProductsController.destroy');
    Route.post('products', 'Api/Admin/ProductsController.store')
      .validator('Products/AdminCreate');
    Route.put('products/:id', 'Api/Admin/ProductsController.update')
      .validator('Products/AdminEdit');
    /////////////////////////////////

    //////////////////////////////// Categories
    Route.get('categories', 'Api/Admin/CategoriesController.index');
    Route.get('categories/:id', 'Api/Admin/CategoriesController.show');
    Route.delete('categories/:id', 'Api/Admin/CategoriesController.destroy');
    Route.post('categories', 'Api/Admin/CategoriesController.store')
      .validator('Categories/AdminCreate');
    Route.put('categories/:id', 'Api/Admin/CategoriesController.update')
      .validator('Categories/AdminEdit');
    /////////////////////////////////

    //////////////////////////////// Sections
    Route.get('sections', 'Api/Admin/SectionsController.index');
    Route.get('sections/:id', 'Api/Admin/SectionsController.show');
    Route.delete('sections/:id', 'Api/Admin/SectionsController.destroy');
    Route.post('sections', 'Api/Admin/SectionsController.store')
      .validator('Sections/AdminCreate');
    Route.put('sections/:id', 'Api/Admin/SectionsController.update')
      .validator('Sections/AdminEdit');
    /////////////////////////////////
  }
).middleware(['auth', 'IsAdmin']).prefix('api/admin');
