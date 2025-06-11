const express = require('express');
const router = express.Router();
const Item = require("../models/item");

// Middleware to check if the user is authenticated as an admin
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.username === 'admin') {
    return next();
  } else {
    res.redirect('/login'); // Redirect to login if not an admin
  }
}

// Route for the admin dashboard or functionality
router.get('/admin', isAdmin, async (req, res) => {
    try {
        const items = await Item.find();
        res.render("pages/adminPage", { items: items, message: req.query.message }); 
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

// Other admin routes and functionality can be added here

module.exports = router;