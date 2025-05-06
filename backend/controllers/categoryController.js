import Category from "../models/Category.js";

// GET all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des catégories", error });
  }
};

// POST create a new category
export const createCategory = async (req, res) => {
  const { key, fr, en } = req.body;

  try {
    const newCategory = new Category({ key, fr, en });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la catégorie", error });
  }
};

// PUT update a category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { key, fr, en } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { key, fr, en },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie", error });
  }
};

// DELETE a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la catégorie", error });
  }
};