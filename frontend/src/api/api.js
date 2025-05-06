import axios from "axios"

const API_BASE_URL = "https://fashop.onrender.com/api"

// ✅ Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})


/* -------------------- AUTH -------------------- */

// ✅ POST : Inscription
export const registerUser = (userData) => api.post("/auth/register", userData);

// ✅ POST : Connexion
export const loginUser = (credentials) => api.post("/auth/login", credentials);

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

// 📝 PUT : Mettre à jour le statut d'une commande
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}`, { status });

// ✅ POST : Créer une commande
export const createOrder = (orderData) => api.post("/orders", orderData);


export default api
