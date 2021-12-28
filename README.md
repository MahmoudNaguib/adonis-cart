# Adonis Cart API application (Adonisjs 4.1)
```bash
Link: https://legacy.adonisjs.com/
```

## Setup

```bash
git clone https://github.com/MahmoudNaguib/adonis-cart.git
cd  adonis-cart
cp .env.example .env
npm install
adonis migration:run
adonis seed --files=DatabaseSeeder.js
adonis serve --dev
```


## Default user
```bash
Email: user1@demo.com
Password: demo@12345
```

## POSTMAN API
```bash
https://documenter.getpostman.com/view/375068/UVRGD3tG
```
## Serving uploads
```bash
{baseURL}/uploads/small/{imageName}
{baseURL}/uploads/large/{imageName}
```
## Serving assets
```bash
{baseURL}/assets/{.....}
```
## Features
```bash
- Authentications: Login/Register/Forgot password
- Profile: Edit profile / Change password

- Admin - Manage: Blog Sections categories
- Admin - Manage: BLog Posts
- Admin - Manage: Products Categories
- Admin - Manage: Products
- Admin - Manage: Orders
- Admin - Manage: Posts Comments

- Guest: Configs
- Guest: Blog Sections
- Guest: Blog Posts
- Guest: Blog Comments
- Guest: Categories
- Guest: Products

- Logged User - Addresses
- Logged User - Profile
- Logged User - Notifications
- Logged User - Cart
- Logged User - Favourites
- Logged User - Orders
- Logged User - Comments


```


