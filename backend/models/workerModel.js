const mongoose = require("mongoose");

const workerModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    certifications: {
      type: [String],
      required: true,
    },
    availability: {
      type: {
        days: [String],
        startTime: Date,
        endTime: Date,
      },
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: [
        {
          employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          stars: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);
const Worker = mongoose.model("Worker", workerModel);
module.exports = Worker;
