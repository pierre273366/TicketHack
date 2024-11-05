const mongoose = require("mongoose");
require("./connection");

const cartsSchema = mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "trips" },
});

const Cart = mongoose.model("carts", cartsSchema);

module.exports = Cart;
