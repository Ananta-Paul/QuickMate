const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const {
  // accessJob,
  fetchJobs,
  createJob,
  update,
  remove,
  // addTo,
} = require("../controllers/jobController");
// router.route("/").post(auth, accessJob);
router.route("/").get(auth, fetchJobs);
router.route("/").post(auth, createJob);
router.route("/").put(auth, update);
// router.route("/add").put(auth, addTo);
router.route("/").delete(auth, remove);

module.exports = router;
