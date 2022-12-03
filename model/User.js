// user.js
const Mongoose = require("mongoose");

const oneBook = new Mongoose.Schema({
  id: {
    type: Object,
    unique: false,
    required: false,
    default: false,
  },
  expireAt: { type: Date, default: Date.now, expires: 60 }, // expired in 2 hours
});

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
  lendBooks: [
    {
      id: {
        type: Object,
        unique: false,
        required: false,
        default: false,
      },
    },
  ],
  confirmation: {
    type: Boolean,
    unique: false,
    required: false,
    default: false,
  },
  history: [
    {
      type: Object,
      unique: false,
      required: false,
      default: false,
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
