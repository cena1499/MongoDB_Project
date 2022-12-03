// user.js
const Mongoose = require("mongoose");
const BookSchema = new Mongoose.Schema({
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
  numberOfLicense: {
    type: Number,
    unique: false,
    required: true,
  },
  numberOfLendLicense: {
    type: Number,
    unique: false,
    required: true,
  },
});

const Book = Mongoose.model("book", BookSchema);
module.exports = Book;
