import express from "express";
const router = express.Router();
import { Register } from "../controller/auth.controller.js";
router.route("/register").post(Register);
export default router;
