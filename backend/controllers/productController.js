import Product from "../models/Product.js"
import Category from "../models/Category.js";
import { v2 as cloudinary } from "cloudinary";


// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId", "key fr en").sort({ createdAt: -1 }) // newest first
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

// 🔄 GET : Récupérer un produit par ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("categoryId", "key fr en");
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération du produit", error });
  }
};

// ✅ POST create new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, isNewArrival, isBestSeller } = req.body;

    // Ensure the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const imageFiles = req.files; // Use req.files for multiple files
    const imageUrls = [];

    for (const file of imageFiles) {
      const imageUpload = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
      imageUrls.push(imageUpload.secure_url);
    }

    const newProduct = new Product({
      name: JSON.parse(name),
      description: JSON.parse(description),
      price: JSON.parse(price),
      categoryId,
      isNewArrival: isNewArrival === "true", // Convert string to boolean
      isBestSeller: isBestSeller === "true",
      images: imageUrls, // Assuming images are uploaded
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product", error });
  }
};

// 📝 PUT update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, description, price, categoryId, isNewArrival, isBestSeller, existingImages } = req.body;

    // Parse serialized fields
    const parsedName = name ? JSON.parse(name) : undefined;
    const parsedDescription = description ? JSON.parse(description) : undefined;
    const parsedPrice = price ? JSON.parse(price) : undefined;

    // Handle new image uploads
    const imageFiles = req.files; // Use req.files for multiple files
    const newImageUrls = [];
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageUpload = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        newImageUrls.push(imageUpload.secure_url);
      }
    }

    // Merge existing images with new images
    const allImages = [
      ...(existingImages ? JSON.parse(existingImages) : []), // Parse existing images if provided
      ...newImageUrls,
    ];

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...(parsedName && { name: parsedName }),
        ...(parsedDescription && { description: parsedDescription }),
        ...(parsedPrice && { price: parsedPrice }),
        ...(categoryId && { categoryId }),
        images: allImages, // Merge existing and new images
        isNewArrival: isNewArrival === "true", // Convert string to boolean
        isBestSeller: isBestSeller === "true",
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating product", error });
  }
};

// ❌ DELETE product
export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" })
    }
    res.status(200).json({ message: "Produit supprimé avec succès" })
  } catch (error) {
    res.status(400).json({ message: "Erreur suppression produit", error })
  }
}

// Récupérer les nouveaux arrivages
export const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true });
    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur dans getNewArrivals :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des nouveaux arrivages", error });
  }
};

// Récupérer les best-sellers
export const getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({ isBestSeller: true });
    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur dans getBestSellers :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des best-sellers", error });
  }
};
