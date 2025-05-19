import express from "express";
import { getSettings, updateSettings } from "../controllers/settingController.js";

const router = express.Router();

// Récupérer les paramètres
router.get("/", getSettings);

// Mettre à jour les paramètres (admin uniquement)
router.put("/", updateSettings);

export default router;