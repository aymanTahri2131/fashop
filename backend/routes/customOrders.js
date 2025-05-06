import express from 'express';
import multer from 'multer';
import CustomOrder from '../models/CustomOrder.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import connectCloudinary from '../config/cloudinary.js';

const router = express.Router();

// Appel config cloudinary
connectCloudinary();

// Multer : upload local temporaire
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('reference'), async (req, res) => {
  try {
    const { name, email, phone, type, description, budget, timeline } = req.body;
    let referenceUrl = '';

    if (req.file) {
      const filePath = path.resolve(req.file.path);
      const result = await cloudinary.uploader.upload(filePath);
      referenceUrl = result.secure_url;
      fs.unlinkSync(filePath); // supprime le fichier local
    }

    const order = new CustomOrder({
      name,
      email,
      phone,
      type,
      description,
      budget,
      timeline,
      referenceUrl,
    });

    await order.save();
    res.status(201).json({ message: 'Commande personnalisée enregistrée.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la soumission." });
  }
});

export default router;
