import express from "express";
const router = express.Router();
import {
  Register,
  Login,
  Logout,
  getUser,
} from "../controller/user.controller.js";
import isAuthenticated from "../utility/isLog.js";
router.post("/register", Register);
router.route("/login").post(Login);
router.route("/logout").get(isAuthenticated, Logout);
router.route("/getuser").get(isAuthenticated, getUser);
export default router;
