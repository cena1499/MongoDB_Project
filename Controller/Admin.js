const User = require("../model/User");
const url = require("url");

exports.confirmUser = async (req, res, next) => {
  const { confirmation, id } = req.body;
  if (confirmation !== null && id) {
    if (confirmation === false) {
      await User.findById(id)
        .then((user) => {
          if (user.confirmation !== true) {
            user.confirmation = true;
            user.save((err) => {
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res
                .status("201")
                .json({ message: "Confirmation was successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already confirmed" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    }
  } else {
    res.status(400).json({ message: "Confirmation or Id not present" });
  }
};

exports.banUser = async (req, res, next) => {
  const { ban, id } = req.body;
  if (id) {
    if (ban === false) {
      await User.findById(id)
        .then((user) => {
          if (user.ban !== true) {
            user.ban = true;
            user.save((err) => {
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Ban was successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already banned" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    }
  } else {
    res.status(400).json({ message: "Ban or Id not present" });
  }
};

exports.unbanUser = async (req, res, next) => {
  const { ban, id } = req.body;
  if (id) {
    if (ban === true) {
      await User.findById(id)
        .then((user) => {
          if (user.ban !== false) {
            user.ban = false;
            user.save((err) => {
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Unban was successful", user });
            });
          } else {
            res.status(400).json({ message: "User is not banned" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    }
  } else {
    res.status(400).json({ message: "Ban or Id not present" });
  }
};

exports.getNumberOfUnconfirmedUsers = async (req, res, next) => {
  await User.find()
    .then((users) => {
      let counter = 0;
      users.map((user) => {
        user.confirmation ? (counter = counter) : counter++;
      });
      res.status(200).json({ counter: counter });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

exports.getUsersByFilter = async (req, res, next) => {
  const regexFirstname = req.body.filterFirstName;
  const regexLastname = req.body.filterLastName;
  const regexAddress = req.body.filterAddress;
  const regexPersonalID = req.body.filterPersonalID;
  const sortByFirstname = req.body.sortByFirstName;
  const sortByLastName = req.body.sortByLastName;
  const sortByAddress = req.body.sortByAddress;
  const sortByPersonalID = req.body.sortByPersonalID;

  const container = {};

  if (sortByFirstname != 0) container.firstname = sortByFirstname;
  if (sortByLastName != 0) container.lastname = sortByLastName;
  if (sortByAddress != 0) container.address = sortByAddress;
  if (sortByPersonalID != 0) container.personalID = sortByPersonalID;

  await User.find({
    firstname: { $regex: regexFirstname, $options: "i" },
    lastname: { $regex: regexLastname, $options: "i" },
    address: { $regex: regexAddress, $options: "i" },
    personalID: { $regex: regexPersonalID, $options: "i" },
  })
    .collation({ locale: "en" })
    .sort(container)
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
