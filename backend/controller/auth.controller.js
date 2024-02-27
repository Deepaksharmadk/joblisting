import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    console.log(name, email, mobile, password);
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ errorMessage: "bad Request" });
    }
    const isExistUser = await User.findOne({ email: email });
    if (isExistUser) {
      return res.status(409).json({ message: "user already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
      name,
      email,
      mobile,
      password: hashpassword,
    });
    const userResponse = (await userData).save();
    const token = await jwt.sign(
      { userid: userResponse._id },
      process.env.JWT_SECRET
    );
    res.json({
      message: "User registered successfully",
      token: token,
      name: name,
    });
  } catch (error) {
    console.log(error);
  }
};
export { Register };
