const Book = require("../model/Book");
const LendBook = require("../model/LendBook");

//Func to get all books from DB
exports.getBooks = async (req, res, next) => {
  var bookFunction;
  await Book.find({})
    .then((books) => {
      bookFunction = books.map((book) => {
        const container = {};
        container.name = book.name;
        container.author = book.author;
        container.numberOfPages = book.numberOfPages;
        container.year = book.year;
        container.titlePageImage = book.titlePageImage;
        container.coverImage = book.coverImage;
        container.originalNumberOfLicense = book.numberOfLicense;
        container.numberOfLicense = book.numberOfLicense;
        container.id = book._id;
        return container;
      });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );

  for (const book of bookFunction) {
    const licence = await LendBook.countDocuments({
      bookID: book.id,
    });
    book.numberOfLicense = book.numberOfLicense - licence;
  }

  res.status(200).json({ book: bookFunction });
};

//Func to get all books from DB with set filter name, author or year
exports.getBooksWithFilter = async (req, res, next) => {
  const regexName = req.body.filterName;
  const regexAuthor = req.body.filterAuthor;
  const regexYear = req.body.filterYear;
  const sortByName = req.body.sortByName;
  const sortByAuthor = req.body.sortByAuthor;
  const sortByYear = req.body.sortByYear;

  const container = {};
  var bookFunction;

  if (sortByName != 0) container.name = sortByName;
  if (sortByAuthor != 0) container.author = sortByAuthor;
  if (sortByYear != 0) container.year = sortByYear;

  await Book.find({
    name: { $regex: regexName, $options: "i" },
    author: { $regex: regexAuthor, $options: "i" },
    year: { $regex: regexYear, $options: "i" },
  })
    .collation({ locale: "en" })
    .sort(container)
    .then((books) => {
      bookFunction = books.map((book) => {
        const container = {};
        container.name = book.name;
        container.author = book.author;
        container.numberOfPages = book.numberOfPages;
        container.year = book.year;
        container.titlePageImage = book.titlePageImage;
        container.coverImage = book.coverImage;
        container.numberOfLicense = book.numberOfLicense;
        container.originalNumberOfLicense = book.numberOfLicense;
        container.id = book._id;
        return container;
      });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );

  for (const book of bookFunction) {
    const licence = await LendBook.countDocuments({
      bookID: book.id,
    });
    book.numberOfLicense = book.numberOfLicense - licence;
  }

  res.status(200).json({ book: bookFunction });
};

//Func to get detail about one book
exports.getBook = async (req, res, next) => {
  const container = {};

  await Book.findById(req.params.id)
    .then((book) => {
      container.name = book.name;
      container.author = book.author;
      container.numberOfPages = book.numberOfPages;
      container.year = book.year;
      container.titlePageImage = book.titlePageImage;
      container.coverImage = book.coverImage;
      container.numberOfLicense = book.numberOfLicense;
      container.originalNumberOfLicense = book.numberOfLicense;
      container.id = book._id;
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );

  const licence = await LendBook.countDocuments({
    bookID: container.id,
  });
  container.numberOfLicense = container.numberOfLicense - licence;

  res.status(200).json({ book: container });
};

//Func to create new book
exports.createBook = async (req, res, next) => {
  const {
    name,
    author,
    numberOfPages,
    year,
    titlePageImage,
    coverImage,
    numberOfLicense,
  } = req.body;

  const numberOfLendLicense = numberOfLicense;

  await Book.create({
    name,
    author,
    numberOfPages,
    year,
    titlePageImage,
    coverImage,
    numberOfLicense,
    numberOfLendLicense,
  })
    .then((book) => {
      res.status(201).json({
        message: "Book successfully created",
      });
    })
    .catch((error) =>
      res.status(400).json({
        message: "Book not successful created",
        error: error.message,
      })
    );
};

//Func to edit book
exports.editBook = async (req, res, next) => {
  const {
    name,
    author,
    numberOfPages,
    year,
    titlePageImage,
    coverImage,
    numberOfLicense,
  } = req.body;

  await Book.findById(req.params.id)
    .then((book) => {
      book.name = name;
      book.author = author;
      book.numberOfPages = numberOfPages;
      book.year = year;
      book.titlePageImage = titlePageImage;
      book.coverImage = coverImage;
      book.numberOfLicense = numberOfLicense;
      book.save((err) => {
        if (err) {
          res
            .status("400")
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
        res.status("201").json({ message: "Update successful", book });
      });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

//Func to delete book
exports.deleteBook = async (req, res, next) => {
  const { id } = req.body;

  const lendLicences = await LendBook.countDocuments({
    bookID: id,
  });
  if (lendLicences !== 0) {
    res.status(400).json({
      message: "You don't can delete this book",
      error: error.message,
    });
  } else {
    await Book.findById(id)
      .then((book) => {
        if (book.numberOfLendLicense === book.numberOfLicense) {
          book.remove();
        } else {
          res
            .status(400)
            .json({ message: "This book is lend", error: error.message });
        }
      })
      .then((book) =>
        res.status(201).json({ message: "Book successfully deleted" })
      )
      .catch((error) =>
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message })
      );
  }
};
