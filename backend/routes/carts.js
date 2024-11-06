var express = require("express");
var router = express.Router();
const Cart = require("../model/carts");
const Trip = require("../model/trips");

// Get all carts elements
router.get("/", (req, res) => {
  Cart.find()
    .populate("tripId") // Get informations from Key ID (clé étrangère)
    .then((trips) => {
      if (trips.length > 0) {
        return res.json({ result: true, trips: trips });
      }
      res.json({ result: false });
    });
});

// Add cart element
router.post("/add", async (req, res) => {
  const tripId = req.body.tripId;
  const isTrip = await Trip.findById(tripId).then((data) =>
    data ? true : false
  );
  // Check if id exist
  if (isTrip) {
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
router.delete("/delete-all", (req, res) => {
  console.log("route");
  Cart.deleteMany().then(() => res.json({ result: true }));
});

module.exports = router;
