import express from 'express';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email requis.' });

    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'Vous êtes déjà inscrit.' });
    }

    const subscriber = new NewsletterSubscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: 'Inscription réussie à la newsletter.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’inscription.' });
  }
});

export default router;
