const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
  address: {
    required: true,
    type: String,
  },
  imageUrl: {
    required: true,
    type: String,
  },
  ownerId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  openTime: {
    required: true,
    type: Date,
  },
  closeTime: {
    required: true,
    type: Date,
  },
  title: {
    required: true,
    type: String,
  },
  hourlyRate: {
    required: true,
    type: Number,
  },
  availableParking: {
    required: true,
    type: Number,
  },
  bookedParking: {
    required: true,
    type: Number,
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
});
module.exports = mongoose.model("Parking", ParkingSchema);
