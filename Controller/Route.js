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
  getHistoryOfLendBooks,
  getCountOfLendBooksByAdmin,
} = require("./User");

const {
  createBook,
  getBooks,
  getBooksWithFilter,
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
router.route("/getBooksWithFilter").post(adminAuth, getBooksWithFilter);
router
  .route("/getCountOfLendBooksByAdmin")
  .post(adminAuth, getCountOfLendBooksByAdmin);

router.route("/banUser").put(adminAuth, banUser);
router.route("/unbanUser").put(adminAuth, unbanUser);
router.route("/confirmUser").put(adminAuth, confirmUser);
router.route("/editUserByAdmin/:id").put(adminAuth, editUserByAdmin);
router.route("/editBook/:id").put(adminAuth, editBook);

//router.route("/deleteUser").delete(adminAuth, deleteUser);
router.route("/deleteBook").delete(adminAuth, deleteBook);

//User routes
router.route("/getID").get(loginAuth, getID);
router.route("/getCountOfLendBooks").get(loginAuth, getCountOfLendBooks);
router.route("/getBooks").get(loginAuth, getBooks);
router.route("/getBook/:id").get(loginAuth, getBook);

router.route("/editUserByUser/:id").put(userAuth, editUserByUser);
router.route("/lendBook").put(loginAuth, lendBook);
router.route("/returnBook").put(loginAuth, returnBook);

router.route("/getLendBooks").post(loginAuth, getLendBooks);
router.route("/getUnLendBooks").post(loginAuth, getUnLendBooks);
router.route("/getHistoryOfLendBooks").post(loginAuth, getHistoryOfLendBooks);
router
  .route("/getUnLendBooksWithFilter")
  .post(loginAuth, getUnLendBooksWithFilter);

//Normal routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUsers").get(getUsers);
router.route("/getUser/:id").get(getUser);

module.exports = router;
