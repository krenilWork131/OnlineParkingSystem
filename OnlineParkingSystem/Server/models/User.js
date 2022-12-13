const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
// module.exports = mongoose.model('Data', dataSchema)
