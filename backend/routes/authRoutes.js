import express from "express";
import { registerUser, loginUser, fetchUsers } from "../controllers/authController.js";

const router = express.Router();

// Route pour l'inscription
router.post("/register", registerUser);

// Route pour la connexion
router.post("/login", loginUser);

router.get("/users", fetchUsers);

export default router;