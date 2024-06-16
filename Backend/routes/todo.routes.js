import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
import verifyAuth from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/").get(getTodos);
router.route("/getSingleTodo").get(getTodo);
router.route("/create").post(verifyAuth, createTodo);
router.route("/update").patch(verifyAuth, updateTodo);
router.route("/delete/:id").delete(verifyAuth, deleteTodo);

export default router;
