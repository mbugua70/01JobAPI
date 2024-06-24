const getAllJobs = (req, res) => {
    res.send("Get all jobs");
}

const createJobs = (req, res) => {
    res.send("Create jobs")
}

const getJob = (req, res) => {
    res.send("Get job")
}

const updateJob = (req, res) => {
    res.send("Update job")
}

const deleteJob = (req, res) => {
    res.send("Delete job")
}


module.exports = {
    getAllJobs,
    createJobs,
    getJob,
    updateJob,
    deleteJob
}
