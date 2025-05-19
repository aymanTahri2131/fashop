import axios from "axios"
import { decryptData } from "../encryptData"

// const API_BASE_URL = "http://localhost:4000/api"
const API_BASE_URL = "https://fashop.up.railway.app/api"

// ✅ Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

//----------------- Settings ----------------------

// 🔄 GET : Récupérer les paramètres
export const fetchSettings = () => api.get("/settings");

// 📝 PUT : Mettre à jour les paramètres
export const updateSettings = (settings) => api.put("/settings", settings);


/* -------------------- AUTH -------------------- */

// ✅ POST : Inscription
export const registerUser = (userData) => api.post("/auth/register", userData);

// ✅ POST : Connexion
export const loginUser = (credentials) => api.post("/auth/login", credentials);

export const fetchUsers = () => api.get("/auth/users");

export const updateUser = (userData) => {
  const encryptedUser = localStorage.getItem("user"); // Retrieve the encrypted user data
  if (!encryptedUser) {
    throw new Error("No user data found. Please log in again.");
  }

  const user = decryptData(encryptedUser); // Decrypt the user data
  if (!user || !user.token) {
    throw new Error("Invalid user data. Please log in again.");
  }

  const token = user.token; // Extract the token from the decrypted user data
  console.log("Token for update:", token); // Debugging log

  return api.put("/users/profile", userData, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });
};

/* -------------------- PRODUITS -------------------- */

// 🔄 GET tous les produits
export const fetchProducts = () => api.get("/products")

// 🔄 GET : Récupérer un produit par ID
export const fetchProductById = (id) => api.get(`/products/${id}`);

// ✅ POST : Créer un produit
export const createProduct = (newProduct) =>
  api.post("/products", newProduct, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 📝 PUT : Mettre à jour un produit
export const updateProduct = (id, updatedProduct) =>
  api.put(`/products/${id}`, updatedProduct, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ❌ DELETE : Supprimer un produit
export const deleteProduct = (id) => api.delete(`/products/${id}`)

export const fetchNewArrivals = async () => {
  const response = await api.get(`/products/new-arrivals`);
  return response.data;
};

export const fetchBestSellers = async () => {
  const response = await api.get(`/products/best-sellers`);
  return response.data;
};

// ✅ POST : Créer une commande personnalisée (multipart)
export const submitCustomOrder = (formData) =>
  api.post("/custom-orders", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ POST : Envoyer un message de contact
export const submitContactMessage = (data) =>
  api.post("/contact", data);

// ✅ POST : Inscription à la newsletter
export const subscribeToNewsletter = (email) =>
  api.post("/newsletter", { email });

export const fetchCategories = () => api.get("/categories");

// 🔄 GET : Récupérer toutes les commandes
export const fetchOrders = () => api.get("/orders");
export const fetchOrdersByUser = (userId) =>
  api.get(`/orders/user`, { params: { userId } });

// 📝 PUT : Mettre à jour le statut d'une commande
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}`, { status });

// ✅ POST : Créer une commande
export const createOrder = (orderData) => api.post("/orders", orderData);

/* -------------------- TÉMOIGNAGES -------------------- */

// 🔄 GET : Récupérer tous les témoignages
export const fetchTestimonials = () => api.get("/testimonials");

// ✅ POST : Créer un témoignage
export const addTestimonial = (testimonialData) =>
  api.post("/testimonials", testimonialData);

// 🔄 GET : Récupérer les témoignages par productId
export const fetchTestimonialsByProductId = (productId) =>
  api.get(`/testimonials/product/${productId}`);

// 📝 PUT : Mettre à jour un témoignage
export const updateTestimonial = (id, updatedData) =>
  api.put(`/testimonials/${id}`, updatedData);

// ❌ DELETE : Supprimer un témoignage
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

// 📝 PATCH : Approuver ou désapprouver un témoignage
export const toggleApprovalStatus = (id) =>
  api.patch(`/testimonials/${id}/toggle-approval`);


export default api
