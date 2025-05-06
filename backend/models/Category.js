import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true, // Ensure each key is unique
  },
  fr: {
    type: String,
    required: true, // French name
  },
  en: {
    type: String,
    required: true, // English name
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;