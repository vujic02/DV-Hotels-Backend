const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 3,
  },

  email: {
    required: true,
    type: String,
    unique: true,
  },

  password: {
    require: true,
    type: String,
    minlength: 5,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Users", userSchema);
