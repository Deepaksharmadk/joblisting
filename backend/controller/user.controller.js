import { User } from "../models/user.model.js";
import { ApiError } from "../utility/apiError.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { sendToken } from "../utility/jwttoken.js";
const Register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  console.log(name, email, phone, password);
  if (!name || !email || !phone || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const user = await User.create({
    name,
    email,
    phone,
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
});

export { Register };
