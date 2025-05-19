import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRoutes from "./routes/productRoutes.js"
import customOrdersRoutes from './routes/customOrders.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';
import categoryRoutes from "./routes/category.js";
import orderRoutes from "./routes/order.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import testimonialRoutes from "./routes/testimonial.js";
import settingRoutes from "./routes/setting.js";

//app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(cors())

//middlewares

app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');

  // Intercepter les requêtes OPTIONS pour les requêtes préliminaires
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

//api endpoint
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/custom-orders', customOrdersRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/settings", settingRoutes);



app.listen(port, () => {
  console.log(`App is Running on ${port}`);
});
