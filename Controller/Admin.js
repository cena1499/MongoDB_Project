const User = require("../model/User");

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
