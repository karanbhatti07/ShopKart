import express from "express";

import {
  register,
  login,
  logout,
  profile,
  AllUsers
} from "../controllers/authControllers.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout",logout)
router.get("/profile", profile);

router.get("/allUsers",AllUsers)

export default router;