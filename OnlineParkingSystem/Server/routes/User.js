const express = require("express");
const UserModel = require("../models/User");

const router = express.Router();
const Booking = require("../models/Booking");

// User

// Create User
router.post("/createUser", async (req, res) => {
  const data = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json({
      message: "User Create Successfully",
      data: dataToSave,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ success: true, message: error.message });
  }
});

router.post("/updateUser", (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
  };

  UserModel.findByIdAndUpdate(req.body.id, { $set: data })
    .then((result) => {
      return res.status(200).json({
        message: "User Update Successfully",
        data: result,
        success: true,
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: true, message: error.message });
    });
});

router.post("/deleteUser", (req, res) => {
  UserModel.findByIdAndRemove(req.body.id)
    .then((result) => {
      return res.status(200).json({
        message: "User Delete Successfully",
        data: result,
        success: true,
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: true, message: error.message });
    });
});

// Log In
router.post("/logIn", async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(data);
  try {
    const findUser = await UserModel.findOne(data);
    console.log(findUser);
    if (findUser === null) {
      res
        .status(200)
        .json({ message: "User Not Found", data: [], success: false });
    } else {
      res
        .status(200)
        .json({ message: "LogIn Successfull", data: findUser, success: true });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get User List
router.get("/getUserList", async (req, res) => {
  try {
    const findTask = await UserModel.find();
    if (findTask.length === 0) {
      res.status(404).json({ message: "No Task Found" });
    } else {
      res.status(200).json(findTask);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get Slot List Which Booked By User
router.get("/getBookingList/:userId", (req, res) => {
  const userId = req.params.userId;
  Booking.find({ userId: userId })
    .populate("parkingId")
    .then((result) => {
      return res.status(200).json({ message: "Succes", data: result });
    })
    .catch((error) => {
      return res.status(404).json({ message: error });
    });
});

module.exports = router;
