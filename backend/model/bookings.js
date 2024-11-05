const mongoose = require("mongoose");
require("./connection");

const bookingsSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
});

const Booking = mongoose.model("bookings", bookingsSchema);

module.exports = Booking;
