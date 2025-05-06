import express from "express"
import { uploadMultiple } from "../middleware/uploadMiddleware.js";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getNewArrivals, getBestSellers } from "../controllers/productController.js"

const router = express.Router()

router.get("/new-arrivals", getNewArrivals);
router.get("/best-sellers", getBestSellers);

router.get("/", getAllProducts)
router.get("/:id", getProductById);

router.post("/", uploadMultiple, createProduct)
router.put("/:id", uploadMultiple, updateProduct)

router.delete("/:id", deleteProduct)

export default router
