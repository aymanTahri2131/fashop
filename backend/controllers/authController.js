import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ Register
export const registerUser = async (req, res) => {
  const { firstName, lastName , email, phone, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userEmail = await User.findOne({ email });
    const userPhone = await User.findOne({ phone });
    if (userEmail) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    } else if (userPhone) {
      return res.status(400).json({ message: "Ce numéro de téléphone est déjà utilisé." });
    }

    // Créer un nouvel utilisateur
    const user = await User.create({ firstName, lastName , email, phone, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Données utilisateur invalides." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};