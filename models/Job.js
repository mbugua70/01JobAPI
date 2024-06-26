const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please the field can't be empty"],
    },
    position: {
      type: String,
      required: [true, "Please the field can't be empty"],
    },
    status: {
      type: String,
      required: [true, "Please the field can't be empty"],
      enum: ["interwing", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timeStamps: true }
);

const JobModel = mongoose.model("Job", JobSchema);

module.exports = JobModel;
