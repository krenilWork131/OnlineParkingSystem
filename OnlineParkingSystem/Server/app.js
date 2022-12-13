require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = "mongodb://localhost:27017/OnlineParking";
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
mongoose.connect(mongoString);
const database = mongoose.connection;

app.use(cors());
app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname + ".jpeg");
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const routes = require("./routes/User");
const book = require("./routes/BookParkingSlot");
const parking = require("./routes/Parking");
const payment = require("./routes/payment");
app.use("/api/user/", routes);
app.use("/api/", book);
app.use("/api/parking/", parking);
app.use("/", payment);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
  app.listen(5000, () => {
    console.log(`Server Started at ${5000}`);
  });
});
