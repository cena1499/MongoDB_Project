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
      name: {
        type: String,
        unique: false,
        required: true,
      },
      author: {
        type: String,
        unique: false,
        required: true,
      },
      numberOfPages: {
        type: Number,
        unique: false,
        required: true,
      },
      year: {
        type: String,
        unique: false,
        required: true,
      },
      titlePageImage: {
        type: String,
        unique: false,
        required: true,
      },
      coverImage: {
        type: String,
        unique: false,
        required: true,
      },
      time: {
        type: Date,
        default: Date.now,
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
