const JobModel = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  //   getting the user by auntentication
  const jobs = await JobModel.find({ createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ jobs });
};

const createJobs = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const jobs = await JobModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ jobs });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: job_id },
  } = req;

  const job = await JobModel.findOne({ _id: job_id, createdBy: userId });
};

const updateJob = (req, res) => {
  res.send("Update job");
};

const deleteJob = (req, res) => {
  res.send("Delete job");
};

module.exports = {
  getAllJobs,
  createJobs,
  getJob,
  updateJob,
  deleteJob,
};
