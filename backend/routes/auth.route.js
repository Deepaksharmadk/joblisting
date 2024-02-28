import express from "express";
const router = express.Router();
import { Register, Login } from "../controller/auth.controller.js";
router.route("/register").post(Register);
router.route("/login").post(Login);
export default router;
