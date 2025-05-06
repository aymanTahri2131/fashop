"use client"

import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { encryptData, decryptData } from "./encryptData"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import AdminLayout from "./components/admin/AdminLayout"
import ScrollToTop from "./components/scrollToTop"

// Pages publiques
import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home"
import Shop from "./pages/Shop"
import About from "./pages/About"
import CustomOrders from "./pages/CustomOrders"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Contact from "./pages/Contact"
import Blog from "./pages/Blog"
import NotFound from "./pages/NotFound"

// Pages admin
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import AdminOrders from "./pages/admin/Orders"
import AdminCustomers from "./pages/admin/Customers"
import AdminTestimonials from "./pages/admin/Testimonials"
import AdminSettings from "./pages/admin/Settings"

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")
  const isLoginRoute = location.pathname.startsWith("/login")
  const isRegisterRoute = location.pathname.startsWith("/register")

  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null; // Si aucune donnée n'est trouvée, retourner `null`
  
    const decryptedUser = decryptData(savedUser); // Tenter de déchiffrer les données
    return decryptedUser || null; // Retourner `null` si le déchiffrement échoue
  });

  const logout = () => {
    setUser(null); // Déconnecter l'utilisateur
    localStorage.removeItem("user"); // Supprimer les données utilisateur du stockage local
    navigate("/");
  };

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  const [language, setLanguage] = useState("fr")

  useEffect(() => {
    if (user) {
      const encryptedUser = encryptData(user); // Chiffrer les données utilisateur
      localStorage.setItem("user", encryptedUser); // Stocker les données chiffrées
    } else {
      localStorage.removeItem("user"); // Supprimer les données si l'utilisateur est déconnecté
    }
  }, [user]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const decryptedUser = decryptData(savedUser);
      if (!decryptedUser) {
        localStorage.removeItem("user"); // Supprimer les données corrompues
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, qtt) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product._id)
      if (existing) {
        return prev.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + qtt }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product._id,
          name: product.name,
          categoryId: product.categoryId?.[language],
          image: product.images[0],
          price: product.price.mad,
          quantity: qtt,
        },
      ]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCart([])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"))
  }

  return (
    <div className="flex flex-col min-h-screen overflow-y-hidden ">
      {!isAdminRoute && !isLoginRoute && !isRegisterRoute && (
        <Header
          cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          language={language}
          toggleLanguage={toggleLanguage}
          user={user}
          logout={logout}
        />
      )}
      <main className="flex-grow bg-[#F0E4CF]/30">
        <ScrollToTop />
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home language={language} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop language={language} addToCart={addToCart} />} />
          <Route path="/shop/:id" element={<ProductDetail language={language} addToCart={addToCart} />} />
          <Route path="/about" element={<About language={language} />} />
          <Route path="/custom-orders" element={<CustomOrders language={language} />} />
          <Route path="/cart" element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              language={language}
            />
          } />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} language={language} user={user} />} />
          <Route path="/contact" element={<Contact language={language} />} />
          {/* <Route path="/blog" element={<Blog language={language} />} /> */}

          {/* ✅ Admin Routes imbriquées dans AdminLayout */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* ✅ 404 Page */}
          <Route path="*" element={<NotFound language={language} />} />
        </Routes>
      </main>
      {!isAdminRoute && !isLoginRoute && !isRegisterRoute && <Footer language={language} />}
    </div>
  )
}

export default App
