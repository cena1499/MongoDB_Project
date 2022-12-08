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
  createAt: {
    type: Date,
    //Zmenit expiraci na produkci
    expires: 600,
  },
  /*expireAt: {
    type: Date,
    default: Date.now() + 6 * 24 * 60 * 60 * 1000,
    required: true,
  },*/
});

const LendBook = Mongoose.model("lendBook", LendBookSchema);
module.exports = LendBook;
