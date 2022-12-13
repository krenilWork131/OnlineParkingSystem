const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();
const ParkingModal = require("../models/Parking");
// Create Parking
router.post("/createParking", async (req, res) => {
  console.log("file", req.file);
  console.log("body", req.body);
  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const coordinates = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  const data = new ParkingModal({
    address: req.body.address,
    imageUrl: imageUrl,
    ownerId: req.body.ownerId,
    title: req.body.title,
    openTime: req.body.openTime,
    closeTime: req.body.closeTime,
    hourlyRate: req.body.hourlyRate,
    availableParking: req.body.availableParking,
    coordinates: coordinates,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json({
      success: true,
      message: "Parking Added Successfully",
      data: dataToSave,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/updateParking", async (req, res) => {
  console.log("file", req.file);
  console.log("body", req.body);
  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const coordinates = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  const data = {
    address: req.body.address,
    imageUrl: imageUrl,
    ownerId: req.body.ownerId,
    title: req.body.title,
    openTime: req.body.openTime,
    closeTime: req.body.closeTime,
    hourlyRate: req.body.hourlyRate,
    availableParking: req.body.availableParking,
    coordinates: coordinates,
  };
  const id = req.body.id;
  ParkingModal.findByIdAndUpdate(id, data)
    .then((result) => {
      return res.status(200).json({
        message: "Parking Detail Updated  Successfully",
        data: result,
        success: true,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        message: "Something wents wrong",
        error: error,
        success: false,
      });
    });
});

router.post("/deleteParking", (req, res) => {
  const id = req.body.id;
  ParkingModal.findByIdAndRemove(id)
    .then((result) => {
      return res.status(200).json({
        message: "Parking Detail Deleted Successfully",
        data: result,
        success: true,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        message: "Something wents wrong",
        error: error,
        success: false,
      });
    });
});

// Get Parking List By Owner Id
router.get("/parkingList/:ownerId", (req, res) => {
  const ownerId = req.params.ownerId;
  console.log(ownerId);
  try {
    ParkingModal.find({ ownerId: req.params.ownerId })
      .then((result) => {
        return res.status(200).json({ message: "Success", data: result });
      })
      .catch((error) => {
        return res.status(404).json({ message: error.message });
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/getAllParkingList", (req, res) => {
  ParkingModal.find()
    .populate("ownerId")
    .then((result) => {
      return res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Something wents wrong" });
    });
});

router.get("/getBookingList/:parkingId", (req, res) => {
  Booking.find({ parkingId: req.params.parkingId })
    .then((result) => {
      return res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Something wents wrong" });
    });
});

module.exports = router;
