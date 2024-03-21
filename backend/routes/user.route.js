import express from "express";
const router = express.Router();
import { Register, Login } from "../controller/user.controller.js";
router.post("/register", Register);
router.route("/login").post(Login);
export default router;
