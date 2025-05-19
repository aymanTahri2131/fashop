import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    general: {
      storeName: { type: String, required: true },
      storeEmail: { type: String, required: true },
      storePhone: { type: String, required: true },
      storelogo: { type: String, default: "/placeholder.svg" },
    },
    shipping: {
      flatRateMorocco: { type: Number, default: 30 },
      flatRateEurop: { type: Number, default: 30 },
      freeShippingThresholdMorocco: { type: Number, default: 1000 },
      freeShippingThresholdEurop: { type: Number, default: 500 },
      shippingCountries: { type: [String] },
    },
    payment: {
      enableCod: { type: Boolean, default: true },
      enablePaypal: { type: Boolean, default: true },
      enableStripe: { type: Boolean, default: true },
      enableBankTransfer: { type: Boolean, default: true },
      testMode: { type: Boolean, default: true },
    },
    email: {
      orderConfirmation: { type: Boolean, default: true },
      orderShipped: { type: Boolean, default: true },
      orderPayed: { type: Boolean, default: true },
      abandonedCart: { type: Boolean, default: false },
      newsletterFrequency: { type: String, enum: ["daily", "weekly", "monthly"], default: "weekly" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);