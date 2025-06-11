// reference: https://www.passportjs.org/concepts/authentication/middleware/

const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
  }),
  (req, res) => {
    if (req.user && req.user.username === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/items"); // Redirect to "/items" route
    }
  }
);

router.get("/login", (req, res) => {
  res.render("./pages/login");
});

module.exports = router;
