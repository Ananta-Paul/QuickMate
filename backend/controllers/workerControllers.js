const asyncHandler = require("express-async-handler");
const Worker = require("../models/workerModel");

const createworker = asyncHandler(async (req, res) => {
  const {
    userId,
    skills,
    hourlyRate,
    certifications,
    availability,
    rating,
    reviews,
  } = req.body;
  const worker = new Worker({
    userId,
    skills,
    hourlyRate,
    certifications,
    availability,
    rating,
    reviews,
  });
  const createdworker = await worker.save();
  res.status(201).json(createdworker);
});
const getworkers = asyncHandler(async (req, res) => {
  const workers = await Worker.find({});
  res.json(workers);
});
const workerUpdate = asyncHandler(async (req, res) => {
  const {
    userId,
    skills,
    hourlyRate,
    certifications,
    availability,
    rating,
    reviews,
  } = req.body;
  const worker = await Worker.findById(req.params.id);

  if (worker) {
    worker.userId = userId || worker.userId;
    worker.skills = skills || worker.skills;
    worker.hourlyRate = hourlyRate || worker.hourlyRate;
    worker.certifications = certifications || worker.certifications;
    worker.availability = availability || worker.availability;
    worker.rating = rating || worker.rating;
    worker.reviews = reviews || worker.reviews;

    const updatedworker = await worker.save();
    res.json(updatedworker);
  } else {
    res.status(404);
    throw new Error("worker not found");
  }
});
const workerDelete = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (worker) {
    await worker.remove();
    res.json({ message: "worker removed" });
  } else {
    res.status(404);
    throw new Error("worker not found");
  }
});
module.exports = { createworker, getworkers, workerUpdate, workerDelete };
