const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error during logout");
    }
    res.redirect("/login");
  });
});

module.exports = router;
