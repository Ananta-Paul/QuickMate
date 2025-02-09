const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const {
  signupUser,
  userAuth,
  getUsers,
  userUpdate,
  userDelete,
} = require("../controllers/userControllers");
const { getOTP, verifyOTP } = require("../controllers/otpController");
const { verify } = require("crypto");
router
  .route("/")
  .post(signupUser)
  .get(auth, getUsers)
  .delete(auth, userDelete)
  .put(auth, userUpdate);
router.post("/login", userAuth);
router.route("/otp").get(getOTP).post(verifyOTP);

module.exports = router;
