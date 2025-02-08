const mongoose = require("mongoose");

const jobModel = mongoose.Schema(
  {
    title: { type: "String", required: true },
    description: { type: "String", required: true },
    location: { type: "String", required: true },
    budget: { type: "Number", required: true },
    requiredSkills: { type: ["String"], required: true },
    status: {
      type: "String",
      required: true,
      enum: ["open", "closed"],
      default: "open",
    },
    applicants: {
      type: ["ObjectId"],
      ref: "Worker",
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);
const job = mongoose.model("Job", jobModel);
module.exports = job;
