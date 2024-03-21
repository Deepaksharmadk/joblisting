import { User } from "../models/user.model.js";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./apiError.js";

import jwt from "jsonwebtoken";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new ApiError(401, "User Not Authorized");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});
export default isAuthenticated;
