const express = require("express");
const router = express.Router();
const {
  register,
  login,
  update,
  deleteUser,
  adminAuth,
  getUsers,
} = require("./auth");

//Admin routes
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);

//Normal routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUsers").get(getUsers);

module.exports = router;
