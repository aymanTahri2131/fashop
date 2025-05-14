import express from "express";
import { updateUserProfile } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/profile", authenticateUser, updateUserProfile);

export default router;