import jwt from "jsonwebtoken";
import { ApiError } from "../utills/apiError.js";
import { asyncHandler } from "../utills/asyncHandler.js";
import { User } from "../models/users/users.model.js";

const verifyAuth = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(500, "Invalid authorizations tokens");
    }
    const decodedDetails = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedDetails._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(500, "Invalid authorizations tokens");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(500, "Invalid access token");
  }
});

export default verifyAuth;
