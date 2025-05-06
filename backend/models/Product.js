import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            en: { type: String, required: true },
            fr: { type: String, required: true },
        },
        description: {
            en: { type: String, required: true },
            fr: { type: String, required: true },
        },
        price: {
            mad: { type: Number, required: true },
            usd: { type: Number, required: true },
        },
        images: {
            type: [String], // Array of image URLs
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category", // Reference to the Category model
            required: true,
          },
        isNewArrival: { type: Boolean, default: false },
        isBestSeller: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true },
)

export default mongoose.model("Product", productSchema)
