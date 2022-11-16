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
