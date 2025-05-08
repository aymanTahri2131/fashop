import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getOrdersByUser,
} from "../controllers/orderController.js";

const router = express.Router();

// GET all orders
router.get("/", getOrders);
router.get("/user", getOrdersByUser);

// GET a single order by ID
router.get("/:id", getOrderById);

// POST create a new order
router.post("/", createOrder);

// PUT update an order's status
router.put("/:id", updateOrderStatus);

// DELETE an order
router.delete("/:id", deleteOrder);

export default router;