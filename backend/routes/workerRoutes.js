const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const {
  createworker,
  getworkers,
  workerUpdate,
  workerDelete,
} = require("../controllers/workerControllers");
router
  .route("/")
  .post(createworker)
  .get(auth, getworkers)
  .delete(auth, workerDelete)
  .put(auth, workerUpdate);

module.exports = router;
