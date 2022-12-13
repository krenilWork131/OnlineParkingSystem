const express = require("express");
const router = express.Router();
const ParkingModal = require("../models/Parking");
const BookingModel = require("../models/Booking");
// Book Parking Slots
router.post("/booking", (req, res) => {
  BookingModel.find({ parkingId: req.body.parkingId })
    // .count()
    .then((result) => {
      return result;
    })
    .then((result) => {
      console.log(result.length);
      ParkingModal.findByIdAndUpdate(req.body.parkingId, {
        $set: { bookedParking: result.length ? result.length + 1 : 0 },
      }).then(async () => {
        const body = new BookingModel({
          name: req.body.name,
          userId: req.body.userId,
          carNumberPlate: req.body.carNumberPlate,
          parkingId: req.body.parkingId,
          bookingDate: req.body.bookingDate,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          price: req.body.price,
        });
        try {
          const dataToSave = await body.save();
          res.status(200).json({
            message: "Booking SuccessFully",
            data: dataToSave,
            success: true,
          });
        } catch (error) {
          res.status(404).json({ message: error.message, success: false });
        }
      });
    });
});
// Get Booking List By parkingId
router.get("/bookingList/:parkingId", (req, res) => {
  const id = req.params.parkingId;
  ParkingModal.findById(id)
    .then((result) => {
      return res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      return res.status(404).json({ message: error.message });
    });
});

router.get("/getAllBookingList", (req, res) => {
  BookingModel.find()
    .populate("parkingId")
    .then((result) => {
      return res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      return res.status(404).json({ message: error.message });
    });
});

module.exports = router;
