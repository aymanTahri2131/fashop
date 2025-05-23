import Order from "../models/Order.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, customer, email, total, currency, isEuro, items, shipping, payment } = req.body;

    console.log("Items received:", items);

    const newOrder = new Order({
      userId,
      customer,
      email,
      total,
      currency,
      isEuro,
      items,
      shipping,
      payment,
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Update an order's status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};