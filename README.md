# 🧴 SkinNiravana – Online Skincare Shopping App

This project is a full-stack web application built with **Node.js**, **Express**, and **MongoDB** to provide a seamless shopping experience for skincare products. It supports user and admin roles, shopping cart functionality, and MongoDB-backed inventory management.

---

## ✨ Features

- User authentication with Passport.js  
- Signup/Login functionality with hashed passwords  
- Product listing with search and filter  
- Add/update/delete items in cart  
- Admin controls to manage inventory (CRUD)  
- MongoDB collections: Users, Items, Carts  
- CORS/session support, flash messages  

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/snigdhagogineni/online_shopping_SkinNiravana_platform.git
cd online_shopping_SkinNiravana_platform
```

### 2. Install Dependencies

```bash
npm install
npm install express mongoose express-session passport passport-local bcryptjs connect-flash method-override
```

### 3. Configure Database & Port

- Open `app.js`  
- Ensure `localhost:3800` is set or modify to your desired port  
- Update MongoDB database name if needed

### 4. Start the Application

```bash
node app.js
```

### 5. Test Locally

Visit: [http://localhost:3800](http://localhost:3800)  
You’ll be redirected to the login page.

---

## 🧪 App Usage

### User Role

- Sign up → Credentials saved in MongoDB  
- Login → View skincare products  
- Add to cart → Adjust quantity → Checkout

### Admin Role

- Login as `admin`  
- Add/Edit/Delete items in inventory  
- Changes reflect instantly in the MongoDB `Items` collection

---

## 🛒 MongoDB Collections

### Users

```json
{ "_id": ObjectId, "username": String, "password": String, "email": String, "phone": String, "address": String }
```

### Items

```json
{ "_id": ObjectId, "name": String, "description": String, "value": Number, "count": Number, "image": String, "type": String }
```

### Carts

```json
{ "_id": ObjectId, "userId": ObjectId, "items": Array }
```

---

## 🌐 Power Automate/HTTP Integration

This app can be used with platforms like Power Automate via HTTP actions:

- **Method**: GET/POST  
- **URL**: `http://<your-ip>:3800`  
- Data returned in JSON structure

---

## 🧪 Demo & Resources

- 📺 **Video**: [Google Drive](https://drive.google.com/file/d/1gf4-7vOarCg3Y-IzBL8KrpN1_SLC_zon/view?usp=drive_link)  
- 📦 **Backup**: [Box Drive](https://utdallas.box.com/s/tlyfgiqo1qcybybjfzez83d5bdbs6mgm)

---

## 📝 Notes

- Ensure MongoDB is running locally or use MongoDB Atlas  
- Replace sample data or table names as needed  
- Use environment configs in deployment for security  
- Secure admin access and use production-ready session configs

