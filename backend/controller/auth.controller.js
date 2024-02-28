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
    const userData = await new User({
      name,
      email,
      mobile,
      password: hashpassword,
    });
    const userResponse = await userData.save();
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
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errorMessage: "Bad Request! Invalid credentials",
      });
    }

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    const token = await jwt.sign(
      { userId: userDetails._id },
      process.env.JWT_SECRET
    );

    res.json({
      message: "User logged in successfully",
      token: token,
      name: userDetails.name,
    });
  } catch (error) {
    console.log(error);
  }
};
export { Register, Login };
