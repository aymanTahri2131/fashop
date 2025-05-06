import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new ContactMessage({ name, email, subject, message });
    await contact.save();

    res.status(201).json({ message: 'Message de contact enregistré.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' });
  }
});

export default router;
