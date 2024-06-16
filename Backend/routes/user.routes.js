import { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import verifyAuth from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get(verifyAuth, getUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

export default router;
