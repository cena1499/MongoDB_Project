const express = require("express");
const router = express.Router();
const { register, login, deleteUser, adminAuth, userAuth } = require("./Auth");
const {
  confirmUser,
  getNumberOfUnconfirmedUsers,
  banUser,
  unbanUser,
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

//Admin routes
router
  .route("/getNumberOfUnconfirmedUsers")
  .get(adminAuth, getNumberOfUnconfirmedUsers);
router.route("/getUnconfirmedUsers").get(adminAuth, getUnconfirmedUsers);
router.route("/banUser").put(adminAuth, banUser);
router.route("/unbanUser").put(adminAuth, unbanUser);
router.route("/confirmUser").put(adminAuth, confirmUser);
router.route("/editUserByAdmin/:id").put(adminAuth, editUserByAdmin);
router.route("/deleteUser").delete(adminAuth, deleteUser);
router.route("/createUser").post(adminAuth, createUser);

//User routes
router.route("/getID").get(userAuth, getID);
router.route("/editUserByUser/:id").put(userAuth, editUserByUser);

//Normal routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUsers").get(getUsers);
router.route("/getUser/:id").get(getUser);

module.exports = router;
