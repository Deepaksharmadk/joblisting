import express from "express";
const router = express.Router();
import {
  Register,
  Login,
  Logout,
  getUser,
} from "../controller/user.controller.js";
router.post("/register", Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/getuser").get(getUser);
export default router;
