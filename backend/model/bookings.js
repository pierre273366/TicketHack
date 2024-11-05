const mongoose = require("mongoose");
require("./connection");

const bookingsSchema = mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "trips" },
});

const Booking = mongoose.model("bookings", bookingsSchema);

module.exports = Booking;
