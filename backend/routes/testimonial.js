import express from "express";
import {
  getTestimonials,
  createTestimonial,
  getTestimonialsByProductId,
  updateTestimonial,
  deleteTestimonial,
  toggleApprovalStatus,
} from "../controllers/testimonialController.js";

const router = express.Router();

// Récupérer tous les témoignages (accessible à tous)
router.get("/", getTestimonials);

// Récupérer les témoignages par productId
router.get("/product/:productId", getTestimonialsByProductId);

// Créer un témoignage (admin uniquement)
router.post("/", createTestimonial);

// Mettre à jour un témoignage (admin uniquement)
router.put("/:id", updateTestimonial);

// Supprimer un témoignage (admin uniquement)
router.delete("/:id", deleteTestimonial);

// Approuver ou désapprouver un témoignage (admin uniquement)
router.patch("/:id/toggle-approval", toggleApprovalStatus);

export default router;