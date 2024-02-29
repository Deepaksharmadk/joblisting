import express from "express";
const router = express.Router();
import {
  createJob,
  editJob,
  JobDescription,
  viewAlljobListed,
  deleteById,
} from "../controller/job.controller.js";
import job from "../models/job.model.js";
router.route("/create").post(createJob);
router.route("/edit/:jobId").post(editJob);
router.route("/job-description/:jobId").get(JobDescription);
router.route("/all").get(viewAlljobListed);
router.route("/job/:jobId").delete(viewAlljobListed);
export default router;
