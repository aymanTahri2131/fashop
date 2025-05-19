import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Ajoutez l'ID utilisateur à la requête
    next();
  } catch (error) {
    console.error("Failed to authenticate token:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};