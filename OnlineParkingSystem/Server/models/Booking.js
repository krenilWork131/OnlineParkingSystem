const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  carNumberPlate: {
    required: true,
    type: String,
  },
  parkingId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking",
  },
  bookingDate: {
    required: true,
    type: Date,
  },
  startTime: {
    required: true,
    type: Date,
  },
  endTime: {
    required: true,
    type: Date,
  },
  price: {
    required: true,
    type: Number,
  },
});
module.exports = mongoose.model("Booking", BookingSchema);
