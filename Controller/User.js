const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Book = require("../model/Book");
const LendBook = require("../model/LendBook");
const jwtSecret =
  "03f9ac71006511a7c64670966149180e41de642f254623847fd7837f8bc7e0b22a6b33";

const User = require("../model/User");

//Func to get all users
exports.getUsers = async (req, res, next) => {
  await User.find({})
    .then((users) => {
      const userFunction = users.map((user) => {
        const container = {};
        container.firstname = user.firstname;
        container.lastname = user.lastname;
        container.personalID = user.personalID;
        container.address = user.address;
        container.username = user.username;
        container.lendBooks = user.lendBooks;
        container.confirmation = user.confirmation;
        container.history = user.history;
        container.ban = user.ban;
        container.role = user.role;
        container.id = user._id;
        return container;
      });
      res.status(200).json({ user: userFunction });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

//Func to get one user from id
exports.getUser = async (req, res, next) => {
  await User.findById(req.params.id)
    .then((user) => {
      const container = {};
      container.firstname = user.firstname;
      container.lastname = user.lastname;
      container.personalID = user.personalID;
      container.address = user.address;
      container.username = user.username;
      container.lendBooks = user.lendBooks;
      container.confirmation = user.confirmation;
      container.history = user.history;
      container.ban = user.ban;
      container.role = user.role;
      container.id = user._id;
      res.status(200).json({ user: container });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

//Admin func to get all users without confirm
exports.getUnconfirmedUsers = async (req, res, next) => {
  await User.find({ confirmation: false })
    .then((users) => {
      const userFunction = users.map((user) => {
        container = {};
        container.firstname = user.firstname;
        container.lastname = user.lastname;
        container.personalID = user.personalID;
        container.address = user.address;
        container.username = user.username;
        container.lendBooks = user.lendBooks;
        container.confirmation = user.confirmation;
        container.history = user.history;
        container.ban = user.ban;
        container.role = user.role;
        container.id = user._id;
        return container;
      });
      res.status(200).json({ user: userFunction });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

//Admin func to create user
exports.createUser = async (req, res, next) => {
  const { firstname, lastname, personalID, address, username, password } =
    req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      firstname,
      lastname,
      personalID,
      address,
      username,
      password: hash,
    })
      .then((user) => {
        res.status(201).json({
          message: "User successfully created",
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  });
};

//Admin func to edit user by admin
exports.editUserByAdmin = async (req, res, next) => {
  const { firstname, lastname, personalID, address, username } = req.body;

  await User.findById(req.params.id)
    .then((user) => {
      user.firstname = firstname;
      user.lastname = lastname;
      user.personalID = personalID;
      user.address = address;
      user.username = username;
      user.save((err) => {
        //Monogodb error checker
        if (err) {
          res
            .status("400")
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
        res.status("201").json({ message: "Update successful", user });
      });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

//Func to edit user data
exports.editUserByUser = async (req, res, next) => {
  const { firstname, lastname, personalID, address, username } = req.body;

  await User.findById(req.params.id)
    .then((user) => {
      user.firstname = firstname;
      user.lastname = lastname;
      user.personalID = personalID;
      user.address = address;
      user.username = username;
      user.confirmation = false;
      user.save((err) => {
        //Monogodb error checker
        if (err) {
          res
            .status("400")
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
        res.status("201").json({ message: "Update successful", user });
      });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

//Func to get user ID from token
exports.getID = async (req, res, next) => {
  var token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        User.findById(decodedToken.id)
          .then((user) => {
            res.status(200).json({ user: decodedToken.id });
          })
          .catch((err) =>
            res
              .status(401)
              .json({ message: "Not successful", error: err.message })
          );
      }
    });
  }
};

//Function to lend book with idBook and idUser
exports.lendBook = async (req, res, next) => {
  const { idBook, idUser } = req.body;
  const length = await LendBook.find({ userID: idUser }).catch((error) =>
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  );

  //Create LendBook in DB
  if (length >= 6) {
    res.status(401).json({ message: "Not successful", error: "Max 6 book" });
  } else {
    await LendBook.create({
      bookID: idBook,
      userID: idUser,
    }).catch((error) =>
      res.status(400).json({
        message: "Book not successful created",
        error: error.message,
      })
    );

    const container = {};

    //Find book data to history
    await Book.findById(idBook)
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

    //Add history
    await User.findById(idUser)
      .then((user) => {
        user.history.push({
          name: container.name,
          author: container.author,
          numberOfPages: container.numberOfPages,
          year: container.year,
          titlePageImage: container.titlePageImage,
          coverImage: container.coverImage,
        });
        user.save((err) => {
          if (err) {
            res
              .status("400")
              .json({ message: "An error occurred", error: err.message });
            process.exit(1);
          }
          res.status(201).json({
            message: "Book successfully created",
          });
        });
      })
      .catch((err) =>
        res.status(401).json({ message: "Not successful", error: err.message })
      );
  }
};

//Func to return book from lended books
exports.returnBook = async (req, res, next) => {
  const { idBook, idUser } = req.body;

  await LendBook.findOne({ userID: idUser, bookID: idBook })
    .then((book) => {
      book.remove();
    })
    .then((book) =>
      res.status(201).json({ message: "Book successfully deleted" })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};

//Func to get all lended books from one user
exports.getLendBooks = async (req, res, next) => {
  const { id } = req.body;

  //LendBooks
  const lendBooks = await LendBook.find({ userID: id }).catch((err) =>
    res.status(401).json({ message: "Not successful", error: err.message })
  );

  const lendBooksId = [];
  lendBooks.forEach((book) => {
    lendBooksId.push(book.bookID);
  });

  /*await Book.find({ _id: { $in: lendBooksId } })
    .then((books) => {
      res.status(200).json({ book: books });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );*/

  const container = {};
  var bookFunction;

  await Book.find({ _id: { $in: lendBooksId } })
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
        container.expired = Date.now();
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
    const expire = await LendBook.findOne({ userID: id, bookID: book.id });
    book.numberOfLicense = book.numberOfLicense - licence;
    book.expire =
      expire.expiredAt.toString().substring(4, 7) +
      " " +
      (parseInt(expire.expiredAt.toString().substring(8, 10)) + 6).toString() +
      " " +
      expire.expiredAt.toString().substring(11, 15) +
      " " +
      expire.expiredAt.toString().substring(16, 21);
  }

  res.status(200).json({ book: bookFunction });
};

//Func to get all unlend books from one user
exports.getUnLendBooks = async (req, res, next) => {
  const { id } = req.body;

  const lendBooks = await LendBook.find({ userID: id }).catch((err) =>
    res.status(401).json({ message: "Not successful", error: err.message })
  );

  const lendBooksId = [];
  lendBooks.forEach((book) => {
    lendBooksId.push(book.bookID);
  });
  const container = {};
  var bookFunction;

  await Book.find({ _id: { $nin: lendBooksId } })
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

//Func to get all unlend books of one user with filter name, author and year
exports.getUnLendBooksWithFilter = async (req, res, next) => {
  const { id } = req.body;

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

  const lendBooks = await LendBook.find({ userID: id }).catch((err) =>
    res.status(401).json({ message: "Not successful", error: err.message })
  );

  const lendBooksId = [];
  lendBooks.forEach((book) => {
    lendBooksId.push(book.bookID);
  });

  await Book.find({
    _id: { $nin: lendBooksId },
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
        container.numberOfLicense = book.numberOfLendLicense;
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

//Func to get number of count books from one user
exports.getCountOfLendBooks = async (req, res, next) => {
  var token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        User.findById(decodedToken.id)
          .then((user) => {
            if (user.confirmation === true && user.ban === false) {
              LendBook.find({ userID: user._id })
                .then((books) => res.status(200).json({ user: books.length }))
                .catch((error) =>
                  res.status(400).json({
                    message: "An error occurred",
                    error: error.message,
                  })
                );
            } else {
              res.status(200).json({ user: 6 });
            }
          })
          .catch((err) =>
            res
              .status(401)
              .json({ message: "Not successful", error: err.message })
          );
      }
    });
  }
};

//Admin func to get number of count books from one user
exports.getCountOfLendBooksByAdmin = async (req, res, next) => {
  const { id } = req.body;

  User.findById(id)
    .then((user) => {
      if (user.confirmation === true && user.ban === false) {
        LendBook.find({ userID: user._id })
          .then((books) => res.status(200).json({ user: books.length }))
          .catch((error) =>
            res.status(400).json({
              message: "An error occurred",
              error: error.message,
            })
          );
      } else {
        res.status(200).json({ user: 6 });
      }
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

//Func to get history of lend books
exports.getHistoryOfLendBooks = async (req, res, next) => {
  const { id } = req.body;

  await User.findById({ _id: id })
    .then((user) => {
      res.status(200).json({ book: user.history.reverse() });
    })
    .catch((err) =>
      res.status(401).json({ message: "Error", error: err.message })
    );
};
