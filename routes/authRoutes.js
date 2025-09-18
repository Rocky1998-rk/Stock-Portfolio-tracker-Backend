import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

// Register Router here...........
router.post("/register", register);

// Login Router here..............
router.post("/login", login);

export default router;
