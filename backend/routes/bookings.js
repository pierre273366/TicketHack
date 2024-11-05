var express = require("express");
var router = express.Router();
const Booking = require("../model/bookings");

// Get tous les bookings
router.get("/", function (req, res) {
  Booking.find()
    .populate("tripId")
    .then((trips) => {
      if (trips) {
        return res.json({ result: true, trips: trips });
      }
      return res.json({ result: false });
    });
});

// Add bookings
router.post("/add", function (req, res) {
  const tripId = req.body.tripId;
  const newBook = new Booking({
    tripId: tripId,
  });
  newBook.save().then(() => res.json({ result: true }));
});

module.exports = router;
