import { asyncHandler } from "../utills/asyncHandler.js";
import { ApiError } from "../utills/apiError.js";
import { Todo } from "../models/todos/todo.model.js";
import { ApiResponse } from "../utills/apiResponse.js";
import jwt from "jsonwebtoken";
// import { User } from "../models/users/users.model.js";
import mongoose from "mongoose";

const getTodos = asyncHandler(async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  const decodeAccessToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // const userId = decodeAccessToken?._id;
  const userId = new mongoose.Types.ObjectId(decodeAccessToken?._id);
  //   const user = await User.findById(decodeAccessToken?._id);
  //  const userId = user?._id
  const todos = await Todo.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "author_details",
      },
    },
    {
      $addFields: {
        author_details: {
          $first: "$author_details",
        },
        canEdit: {
          $eq: ["$createdBy", userId],
        },
      },
    },
    {
      $project: {
        createdBy: 0,
        "author_details.password": 0,
        "author_details.accessToken": 0,
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        todos: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        todos: 1,
      },
    },
  ]);
  if (!todos) {
    throw new ApiError(404, "todo fetch faliled");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, todos[0], "fetch todo successfully"));
});
const getTodo = asyncHandler(async (req, res) => {
  const { title, id } = req.query;

  if (!title) {
    throw new ApiError(400, "Title query parameter is required");
  }
  const todo = await Todo.findOne({ $or: [{ title }, { _id: id }] });
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Fetched todo successfully"));
});
const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const isAlreadyTodoExisting = await Todo.findOne({
    $or: [{ title }, { description }],
  });
  if (isAlreadyTodoExisting) {
    throw new ApiError(409, "Todo with title,description already exists");
  }
  const todo = await Todo.create({
    title,
    description,
    createdBy: req.user.id,
  });
  if (!todo) {
    throw new ApiError(500, "Todo is not created");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, todo, "Todo created successfully"));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id, title, description } = req.body;
  if (!id || !title || !description) {
    throw new ApiError(400, "All fields are required");
  }
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        description,
      },
    },
    { new: true }
  );

  if (!updatedTodo) {
    throw new ApiError(404, "Todo not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, updatedTodo, "Todo updated successfully"));
});
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.deleteOne({ _id: id });
  if (!todo.deletedCount) {
    throw new ApiError(500, "Todo deletion failed");
  }
  res.status(200).json(new ApiResponse(200, todo, "Todo successfully deleted"));
});
export { getTodos, createTodo, updateTodo, getTodo, deleteTodo };
