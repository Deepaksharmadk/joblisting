import express from "express";
import verifyJwt from "../middleware/auth.middleware.js";
const router = express.Router();
import {
  createJob,
  editJob,
  JobDescription,
  viewAlljobListed,
  deleteById,
} from "../controller/job.controller.js";
import job from "../models/job.model.js";
router.route("/create").post(verifyJwt, createJob);
router.route("/edit/:jobId").post(verifyJwt, editJob);
router.route("/job-description/:jobId").get(JobDescription);
router.route("/all").get(viewAllJobListed);
router.route("/job/:jobId").delete(viewAlljobListed);
export default router;
