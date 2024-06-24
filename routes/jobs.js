const express = require('express');
const router = express.Router();


const {getAllJobs, getJob, createJobs, updateJob, deleteJob} = require('../controllers/jobs');


router.route('/').get(getAllJobs).post(createJobs);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);


module.exports = router;