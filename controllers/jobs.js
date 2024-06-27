const JobModel = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/bad-request");

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
  if (!job) {
    throw new NotFoundError(`No job with id: ${job_id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    params: { id: job_id },
    user: { userId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("company and position cannot be found");
  }

  const job = await JobModel.findByIdAndUpdate(
    { _id: job_id, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    params: { id: job_id },
    user: { userId },
  } = req;

  const job = await JobModel.findByIdAndDelete({
    _id: job_id,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No user with id: ${job_id}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Job deleted successfully" });
};

module.exports = {
  getAllJobs,
  createJobs,
  getJob,
  updateJob,
  deleteJob,
};
