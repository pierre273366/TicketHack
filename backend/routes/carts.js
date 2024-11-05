var express = require("express");
var router = express.Router();
const Cart = require("../model/carts");
const Trip = require("../model/trips");

// Get all carts elements
router.get("/", (req, res) => {
  Cart.find()
    .populate("tripId") // Get informations from Key ID (clé étrangère)
    .then((trips) => {
      if (trips) {
        return res.json({ result: true, trips: trips });
      }
      res.json({ result: false });
    });
});

// Add cart element
router.post("/add", (req, res) => {
  const tripId = req.body.tripId;
  // Check if id exist
  if (Trip.findById(tripId)) {
    const newCartTrip = new Cart({
      tripId: tripId,
    });
    newCartTrip.save().then(() => res.json({ result: true }));
  } else {
    res.json({ result: false });
  }
});

// Delete cart element
router.delete("/delete", async (req, res) => {
  const cartId = req.body.cartId;
  // Check if id exist
  const isId = await Cart.findById(cartId);
  if (isId) {
    Cart.deleteOne({ _id: cartId }).then(() => res.json({ result: true }));
  } else {
    res.json({ result: false });
  }
});

// Delete all
router.delete("/deleteAll", (req, res) => {
  Cart.deleteMany({}).then(() => res.json({ result: true }));
});

module.exports = router;
