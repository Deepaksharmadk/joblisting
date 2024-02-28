import express from "express";
const router = express.Router();
import { createJob, editJob } from "../controller/job.controller.js";
import job from "../models/job.model.js";
router.route("/create").post(createJob);
router.route("/edit/:jobId").post(editJob);
router.route("/create").post(createJob);
export default router;
