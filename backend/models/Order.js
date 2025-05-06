import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["processing", "shipped", "completed", "cancelled"],
      default: "processing",
    },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shipping: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);