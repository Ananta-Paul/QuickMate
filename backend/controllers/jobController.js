const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");

const fetchJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({});
  res.json(jobs);
});
const createJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    location,
    budget,
    requiredSkills,
    status,
    applicants,
  } = req.body;
  const job = new Job({
    title,
    description,
    location,
    budget,
    requiredSkills,
    status,
    applicants,
  });
  const createdJob = await job.save();
  res.status(201).json(createdJob);
});
const update = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    location,
    budget,
    requiredSkills,
    status,
    applicants,
  } = req.body;
  const job = await Job.findById(req.params.id);

  if (job) {
    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.budget = budget || job.budget;
    job.requiredSkills = requiredSkills || job.requiredSkills;
    job.status = status || job.status;
    job.applicants = applicants || job.applicants;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});
const remove = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    await job.remove();
    res.json({ message: "Job removed" });
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

module.exports = { fetchJobs, createJob, update, remove };
