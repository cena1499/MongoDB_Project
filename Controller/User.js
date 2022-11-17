const bcrypt = require("bcryptjs");

const User = require("../model/User");

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
