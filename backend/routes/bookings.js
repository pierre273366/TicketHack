var express = require("express");
var router = express.Router();

/* Là c'est juste un exemple */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Get tous les bookings

// Add bookings

module.exports = router;
