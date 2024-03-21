import { User } from "../models/user.model.js";
import { ApiError } from "../utility/apiError.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { sendToken } from "../utility/jwttoken.js";
const Register = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;
  console.log(fullName, email, phoneNumber, password);
  if (!fullName || !email || !phoneNumber || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const user = await User.create({
    fullName,
    email,
    phoneNumber,
    password,
    role,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  sendToken(user, 201, res, "User Registered!");
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});
export const Login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    throw new ApiError(500, "Please provide email ,password and role.");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(400, "invalid Email Or Password..");
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new ApiError(400, "invalid Email Or Password..");
  }
  if (user.role !== role) {
    throw new ApiError(400, `User with provided email and ${role} not found!`);
  }
  sendToken(user, 201, res, "User Logged In!");
});
export { Register };
