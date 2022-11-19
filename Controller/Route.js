const express = require("express");
const router = express.Router();

const { register, login, deleteUser, adminAuth, userAuth } = require("./Auth");
const {
  confirmUser,
  getNumberOfUnconfirmedUsers,
  banUser,
  unbanUser,
  getUsersByFirstNameString,
} = require("./Admin");
const {
  getUsers,
  getUnconfirmedUsers,
  createUser,
  getUser,
  editUserByAdmin,
  editUserByUser,
  getID,
} = require("./User");

const {
  createBook,
  getBooks,
  getBook,
  editBook,
  deleteBook,
} = require("./Book");

//Admin routes
router
  .route("/getNumberOfUnconfirmedUsers")
  .get(adminAuth, getNumberOfUnconfirmedUsers);
router.route("/getUnconfirmedUsers").get(adminAuth, getUnconfirmedUsers);
router
  .route("/getUsersByFirstNameString")
  .get(adminAuth, getUsersByFirstNameString);

router.route("/createUser").post(adminAuth, createUser);
router.route("/createBook").post(adminAuth, createBook);

router.route("/banUser").put(adminAuth, banUser);
router.route("/unbanUser").put(adminAuth, unbanUser);
router.route("/confirmUser").put(adminAuth, confirmUser);
router.route("/editUserByAdmin/:id").put(adminAuth, editUserByAdmin);
router.route("/editBook/:id").put(adminAuth, editBook);

router.route("/deleteUser").delete(adminAuth, deleteUser);
router.route("/deleteBook").delete(adminAuth, deleteBook);

//User routes
router.route("/getID").get(userAuth, getID);
router.route("/editUserByUser/:id").put(userAuth, editUserByUser);

//Normal routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUsers").get(getUsers);
router.route("/getUser/:id").get(getUser);
router.route("/getBooks").get(getBooks);
router.route("/getBook/:id").get(getBook);

module.exports = router;
