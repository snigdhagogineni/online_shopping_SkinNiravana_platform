// references for whole project
//1 . https://www.codewithazzan.com/authentication-nodejs-passport-js/
//2.  lecture notes

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const app = express();
var flash = require("connect-flash");

const login = require("./routes/login");
const register = require("./routes/register");
const logout = require("./routes/logout");
const items = require("./routes/items");
const cart = require("./routes/cart")
const admin = require("./routes/admin")

mongoose
  .connect("mongodb://0.0.0.0:27017/wplProjectTeam11")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "team11sxv210046", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.set("views", "public");
app.set("view engine", "ejs");

const User = require("./models/user");
const authenticateUser = async (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) return done(null, false, { message: "username not found" });
      if (bcrypt.compareSync(password, user.password)) return done(null, user);
      else return done(null, false, { message: "wrong password" });
    })
    .catch((err) => {
      done(err);
    });
};
const strategy = new LocalStrategy(authenticateUser);
passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
// if we want to see all users
app.get("/view-all-users", async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users in the database:", users);
    res.send("See console for details");
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Error retrieving users");
  }
});

app.get("/", (req,res) => {
  res.render("./pages/login");
})


app.use(flash());

app.use("/", login);
app.use("/", register);
app.use("/", logout);
app.use("/", items);
app.use("/", cart);
app.use("/", admin);
const PORT = 3800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
