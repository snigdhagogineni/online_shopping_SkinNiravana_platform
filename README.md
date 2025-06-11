#SkinNiravana – Online Skincare Shopping App

SkinNiravana is a full-stack web application built using Node.js, Express, MongoDB, and Passport.js, designed to offer a seamless shopping experience for skincare products. It includes features such as user authentication, product browsing, search and filter, cart management, and admin inventory control.

🚀 Features
User registration & login (with secure password hashing)

Product listing with category filters (face, body, hair)

Search bar for quick lookup

Add, update, and delete items from cart

Admin panel for managing inventory (CRUD operations)

MongoDB-backed storage for users, items, and carts

Flash messages for login/signup errors

Session-based authentication with Passport.js

🧩 Tech Stack
Frontend: HTML, CSS, Bootstrap (via templates), JavaScript

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: Passport.js with bcryptjs

Session Management: express-session, connect-flash

Other Tools: method-override

⚙️ Installation & Setup
Step 1: Prerequisites
Ensure you have Node.js and npm installed.

Install Nord.js from www.nordjs.org (if used for theme or design).

bash
Copy
Edit
npm install
npm install express mongoose express-session passport passport-local bcryptjs connect-flash method-override
Step 2: Launch the Project
Extract the project ZIP file and open it in Visual Studio Code.

Update the database name and port in app.js (default: localhost:3800).

Start the application:

bash
Copy
Edit
node app.js
Visit http://localhost:3800 in your browser.

🧪 Usage
Users can sign up, log in, browse products, filter items, manage cart, and place orders.

Admins (username: admin) can add, edit, or delete products from the inventory.

All actions reflect real-time changes in the MongoDB collections: Users, Items, and Carts.

📸 Screenshots & Demo
Login & Signup Pages

Product List with Search/Filter

Cart Management

Admin Inventory Dashboard

📺 Demo Video
📦 Project Box Drive

📂 Database Models
Users
js
Copy
Edit
{ _id, username, password, email, phone, address }
Items
js
Copy
Edit
{ _id, name, description, value, count, image, type }
Carts
js
Copy
Edit
{ _id, userId, items }
