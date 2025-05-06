// backend/seed.js
import mongoose from "mongoose";
import Product from "./models/Product.js"

const mockProducts = [
  {
    name: { fr: "Vase Terracotta", en: "Terracotta Vase" },
    description: {
      fr: "Vase en argile fait à la main avec des motifs naturels.",
      en: "Handmade clay vase with natural patterns.",
    },
    price: { mad: 450, usd: 45 },
    images: ["https://res.cloudinary.com/doq0mdnkz/image/upload/v1745457048/vase_jolwbo.png"],
    category: { key: "vases", fr: "vases", en: "vases" },
    stock: 10,
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    name: { fr: "Tasse Océan", en: "Ocean Mug" },
    description: {
      fr: "Tasse en céramique avec des tons bleus inspirés par l'océan.",
      en: "Ceramic mug with blue tones inspired by the ocean.",
    },
    price: { mad: 180, usd: 18 },
    images: ["https://res.cloudinary.com/doq0mdnkz/image/upload/v1745462394/Pngtree_orange_coffee_mug_clipart_illustration_16273133_q4etnu.png"],
    category: { key: "cups", fr: "tasses", en: "mugs" },
    stock: 20,
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    name: { fr: "Décoration Murale Soleil", en: "Sun Wall Decoration" },
    description: {
      fr: "Décoration murale en forme de soleil, parfaite pour ajouter une touche bohème.",
      en: "Sun-shaped wall decoration, perfect for adding a bohemian touch.",
    },
    price: { mad: 350, usd: 35 },
    images: ["https://res.cloudinary.com/doq0mdnkz/image/upload/v1745458370/Pngtree_a_round_red_decorative_plate_20759669_oidjqm.png"],
    category: { key: "wall-decoration", fr: "decoration murale", en: "wall decoration" },
    stock: 15,
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    name: { fr: "Sculpture Abstraite", en: "Abstract Sculpture" },
    description: {
      fr: "Sculpture abstraite en céramique, pièce unique signée par l'artiste.",
      en: "Abstract ceramic sculpture, unique piece signed by the artist.",
    },
    price: { mad: 520, usd: 52 },
    images: ["https://res.cloudinary.com/doq0mdnkz/image/upload/v1745462698/Pngtree_pottery_wheel_pottery_workshop_14993938_sfolk4.png"],
    category: { key: "unique-pieces", fr: "pieces uniques", en: "unique pieces" },
    stock: 5,
    isNewArrival: true,
    isBestSeller: false,
  },
  // ➕ Ajoute les autres produits ici
]

mongoose.connect("mongodb+srv://tayman1801:REocnQuOCHdJJmCg@cluster0.nloicml.mongodb.net/")
  .then(async () => {
    await Product.deleteMany({})
    await Product.insertMany(mockProducts)
    console.log("✅ Produits importés avec succès")
    process.exit()
  })
  .catch((err) => {
    console.error("❌ Erreur d'import :", err)
    process.exit(1)
  })
