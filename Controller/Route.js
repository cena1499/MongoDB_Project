const express = require("express");
const router = express.Router();
const { register, login, update, deleteUser, adminAuth } = require("./Auth");
const { confirmUser, getNumberOfUnconfirmedUsers } = require("./Admin");
const { getUsers } = require("./User");

//Admin routes
router
  .route("/getNumberOfUnconfirmedUsers")
  .get(adminAuth, getNumberOfUnconfirmedUsers);
router.route("/confirmUser").put(adminAuth, confirmUser);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);

//Normal routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUsers").get(getUsers);

module.exports = router;
