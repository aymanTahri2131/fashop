import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// GET all categories
router.get("/", getAllCategories);

// POST create a new category
router.post("/", createCategory);

// PUT update a category
router.put("/:id", updateCategory);

// DELETE a category
router.delete("/:id", deleteCategory);

export default router;