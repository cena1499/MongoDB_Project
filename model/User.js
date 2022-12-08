// user.js
const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  firstname: {
    type: String,
    unique: false,
    required: true,
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
  },
  personalID: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    unique: false,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  confirmation: {
    type: Boolean,
    unique: false,
    required: false,
    default: false,
  },
  history: [
    {
      id: {
        type: Object,
        unique: false,
        required: false,
        default: false,
      },
    },
  ],
  ban: {
    type: Boolean,
    unique: false,
    required: false,
    default: false,
  },
  role: {
    type: String,
    default: "User",
    required: true,
  },
});

const User = Mongoose.model("user", UserSchema);

module.exports = User;
