// lendBook.js
const Mongoose = require("mongoose");
const LendBookSchema = new Mongoose.Schema({
  bookID: {
    type: String,
    unique: false,
    required: true,
  },
  userID: {
    type: String,
    unique: false,
    required: true,
  },
  expiredAt: {
    type: Date,
    expires: 6 * 24 * 60 * 60 * 1000,
    default: Date.now,
  },
});

const LendBook = Mongoose.model("lendBook", LendBookSchema);
module.exports = LendBook;
