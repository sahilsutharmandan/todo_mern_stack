import { asyncHandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/apiError.js";
import { ApiResponse } from "../utills/apiResponse.js";
import { User } from "../models/users/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const getUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, user, "User retrieved successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "user does not exists");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new ApiError(400, "check your credentials");
  }
  const tokenData = {
    _id: user._id,
    username: user.userName,
    email: user.email,
  };
  const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  });
  res
    .status(200)
    .json(new ApiResponse(201, { token: token }, "User login successfully"));
});
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if ([userName, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(404, "all fields are required");
  }
  const isAlreadyRegistered = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (isAlreadyRegistered) {
    throw new ApiError(404, "User is already registered");
  }
  const user = await User.create({
    userName,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    maxAge: 0,
  });
  res.status(200).json(new ApiResponse(200, {}, "Successfully logout"));
});
export { getUser, loginUser, registerUser, logoutUser };
