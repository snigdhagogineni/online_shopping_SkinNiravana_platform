const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
router.post("/register", alreadyLoggedIn, async (req, res) => {
  const { username, password, email, phone, address } = req.body;

  const usernameExists = await User.findOne({ username: username });
  const emailExists = await User.findOne({ email: email });

  if (usernameExists || emailExists) {
    return res.status(400).send("Username or email already in use");
  }

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    phone,
    address
  });

  newUser
    .save()
    .then(() => {
      res.send("User created successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error creating user");
    });
});

function alreadyLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/items");
    console.log("already logged in");
    return;
  }
  next();
}

router.get("/register", alreadyLoggedIn, (req, res) => {
  res.render("./pages/register");
});

module.exports = router;
