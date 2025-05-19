import Testimonial from "../models/Testimonial.js";

// Récupérer tous les témoignages
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des témoignages." });
  }
};

// Créer un nouveau témoignage
export const createTestimonial = async (req, res) => {
  const { name, location, rating, content, productId, date, isApproved, image } = req.body;

  try {
    const newTestimonial = await Testimonial.create({
      name,
      location,
      rating,
      content,
      productId,
      date,
      isApproved,
      image,
    });
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du témoignage." });
  }
};

export const getTestimonialsByProductId = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const testimonials = await Testimonial.find({ productId, isApproved: true });
      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des témoignages." });
    }
  };

// Mettre à jour un témoignage
export const updateTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Témoignage non trouvé." });
    }
    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour du témoignage." });
  }
};

// Supprimer un témoignage
export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Témoignage non trouvé." });
    }
    res.status(200).json({ message: "Témoignage supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du témoignage." });
  }
};

// Approuver ou désapprouver un témoignage
export const toggleApprovalStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Témoignage non trouvé." });
    }

    testimonial.isApproved = !testimonial.isApproved;
    await testimonial.save();

    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du statut d'approbation." });
  }
};