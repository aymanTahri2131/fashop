import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ Register
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

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
    const user = await User.create({ firstName, lastName, email, phone, password });

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
        shipping: user.shipping,
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Vérifiez les données reçues
    console.log("User ID:", req.user.id); // Vérifiez l'ID utilisateur

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.shipping = req.body.shipping || user.shipping;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    console.log("Updated user data:", user); // Vérifiez les données mises à jour
    

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error); // Loggez l'erreur
    res.status(500).json({ message: "Failed to update user profile" });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, "-password"); // Exclude the password field for security
    res.status(200).json(users); // Send the users as a response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};