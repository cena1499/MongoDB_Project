const express = require("express");
const router = express.Router();

const {
  register,
  login,
  deleteUser,
  adminAuth,
  userAuth,
  loginAuth,
} = require("./Auth");
const {
  confirmUser,
  getNumberOfUnconfirmedUsers,
  banUser,
  unbanUser,
  getUsersByFilter,
  getBooksByFilter,
} = require("./Admin");
const {
  getUsers,
  getUnconfirmedUsers,
  createUser,
  getUser,
  editUserByAdmin,
  editUserByUser,
  getID,
  lendBook,
  getLendBooks,
  returnBook,
  getUnLendBooks,
  getUnLendBooksWithFilter,
  getCountOfLendBooks,
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

router.route("/createUser").post(adminAuth, createUser);
router.route("/createBook").post(adminAuth, createBook);
router.route("/getUsersByFilter").post(adminAuth, getUsersByFilter);

router.route("/banUser").put(adminAuth, banUser);
router.route("/unbanUser").put(adminAuth, unbanUser);
router.route("/confirmUser").put(adminAuth, confirmUser);
router.route("/editUserByAdmin/:id").put(adminAuth, editUserByAdmin);
router.route("/editBook/:id").put(adminAuth, editBook);

router.route("/deleteUser").delete(adminAuth, deleteUser);
router.route("/deleteBook").delete(adminAuth, deleteBook);

//User routes
router.route("/getID").get(loginAuth, getID);
router.route("/getCountOfLendBooks").get(loginAuth, getCountOfLendBooks);

router.route("/editUserByUser/:id").put(userAuth, editUserByUser);
router.route("/lendBook").put(loginAuth, lendBook);

router.route("/getLendBooks").post(loginAuth, getLendBooks);
router.route("/getBooksByFilter").post(loginAuth, getBooksByFilter);
router.route("/getUnLendBooks").post(loginAuth, getUnLendBooks);
router
  .route("/getUnLendBooksWithFilter")
  .post(loginAuth, getUnLendBooksWithFilter);

router.route("/returnBook").put(loginAuth, returnBook);

router.route("/getBooks").get(loginAuth, getBooks);
router.route("/getBook/:id").get(loginAuth, getBook);

//Normal routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUsers").get(getUsers);
router.route("/getUser/:id").get(getUser);

module.exports = router;
