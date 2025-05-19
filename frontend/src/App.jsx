"use client"

import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { encryptData, decryptData } from "./encryptData"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import CurrencySelector from "./components/layout/CurrencySelector"
import AdminLayout from "./components/admin/AdminLayout"
import ScrollToTop from "./components/scrollToTop"

import opencage from "opencage-api-client"

import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

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
import NotAdmin from "./pages/notAdmin"

// Pages admin
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import AdminOrders from "./pages/admin/Orders"
import AdminCustomers from "./pages/admin/Customers"
import AdminTestimonials from "./pages/admin/Testimonials"
import AdminSettings from "./pages/admin/Settings"

const countryToCurrency = {
  France: 'eur',
  Germany: 'eur',
  Spain: 'eur',
  Italy: 'eur',
  Morocco: 'mad',
  Algeria: 'usd',
  Tunisia: 'usd',
  Egypt: 'usd',
  "United States": 'usd',
  Canada: 'usd',
  Brazil: 'usd',
  Argentina: 'usd',
  China: 'usd',
  Japan: 'usd',
  India: 'usd',
  "United Kingdom": 'gbp',
  Australia: 'usd',
  "South Africa": 'usd',
  Nigeria: 'usd',
  Kenya: 'usd',
  Russia: 'usd',
  Turkey: 'usd',
  Mexico: 'usd',
};


function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")
  const isLoginRoute = location.pathname.startsWith("/login")
  const isRegisterRoute = location.pathname.startsWith("/register")

  const navigate = useNavigate();

  const getCountryFromCoords = async (latitude, longitude) => {
    const apiKey = '8c0e159f0c6c41f28b77e0eef3a7ba29'
    try {
      const data = await opencage.geocode({
        q: `${latitude},${longitude}`,
        key: apiKey,
      });

      if (data.results.length > 0) {
        const country = data.results[0].components.country;
        console.log('Données de localisation :', country);
        return country;
      } else {
        console.log('Aucun résultat trouvé.');
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de l’appel à l’API OpenCage :', error.message);
    }
  };

  function getCurrency(country) {
    const currency = countryToCurrency[country];

    if (!currency) return 'mad'; // fallback si pays non reconnu

    // Réinitialise les flags
    setIsEuro(false);
    setIsGbp(false);

    switch (currency) {
      case 'eur':
        setIsEuro(true);
        setCurrency('usd');
        break;
      case 'gbp':
        setIsGbp(true);
        setCurrency('usd');
        break;
      case 'mad':
        setCurrency('mad');
        break;
      case 'usd':
        setCurrency('usd');
        break;
      default:
        setCurrency('mad');
    }

    return currency;
  }

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null; // Si aucune donnée n'est trouvée, retourner `null`

    const decryptedUser = decryptData(savedUser);
    return decryptedUser || null; // Retourner `null` si le déchiffrement échoue
  });

  const [isAdmin, setIsAdmin] = useState(false);



  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  const [language, setLanguage] = useState("fr")
  const [currency, setCurrency] = useState("mad")
  const [devise, setDevise] = useState("mad")
  const [isEuro, setIsEuro] = useState(false)
  const [isGbp, setIsGbp] = useState(false)
  const [priceRange, setPriceRange] = useState([0, currency === "mad" ? 2000 : 200]);

  const selectedLanguage = localStorage.getItem("language"); 

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        setIsAdmin(true); // Si l'utilisateur est admin, mettre à jour l'état
      }
      const encryptedUser = encryptData(user); // Chiffrer les données utilisateur
      localStorage.setItem("user", encryptedUser); // Stocker les données chiffrées
    } else {
      localStorage.removeItem("user"); // Supprimer les données si l'utilisateur est déconnecté
    }
  }, [user]);


  const logout = () => {
    setUser(null); // Déconnecter l'utilisateur
    localStorage.removeItem("user"); // Supprimer les données utilisateur du stockage local
    navigate("/");
  };

  useEffect(() => {

    const lang = navigator.language || navigator.userLanguage; // Obtenir la langue du navigateur

    const localis = navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const country = await getCountryFromCoords(latitude, longitude);
      setCurrency(getCurrency(country));
      console.log("currency", currency);
    })
    
    const langCode = lang.split("-")[0]; // Extraire le code de langue (ex: "fr" ou "en")

    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      console.log("lang", selectedLanguage);
    } else if (!selectedLanguage && langCode === "fr" || !selectedLanguage && langCode === "en") {
      setLanguage(langCode);
      console.log("lang", langCode);
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const decryptedUser = decryptData(savedUser);
      if (!decryptedUser) {
        localStorage.removeItem("user"); // Supprimer les données corrompues
      }
    }

  }, [language]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, qtt) => {

    if (currency !== "mad") {
      setDevise("usd")
    }

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
          currency: currency,
          isEuro: isEuro,
          isGbp: isGbp,
          image: product.images[0],
          price: product.price?.[devise],
          quantity: qtt,
        },
      ]
    })
  }

  const toggleLanguage = (lang) => {
    setLanguage(lang); // Définit directement la langue choisie
  };


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

  return (
    <div className="flex flex-col min-h-screen overflow-y-hidden ">
      {!isAdminRoute && !isLoginRoute && !isRegisterRoute && (
        <Header
          cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          language={language}
          currency={currency}
          setPriceRange={setPriceRange}
          toggleLanguage={toggleLanguage}
          user={user}
          logout={logout}
        />
      )}
      <main className="flex-grow bg-[#F0E4CF]/30">
        <ScrollToTop />
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home language={language} currency={currency} isEuro={isEuro} isGbp={isGbp} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/orders" element={<Orders user={user} />} />
          <Route path="/shop" element={<Shop language={language} currency={currency} addToCart={addToCart} priceRange={priceRange} setPriceRange={setPriceRange} isEuro={isEuro} isGbp={isGbp} />} />
          <Route path="/shop/:id" element={<ProductDetail language={language} currency={currency} isEuro={isEuro} isGbp={isGbp} addToCart={addToCart} />} />
          <Route path="/about" element={<About language={language} />} />
          <Route path="/custom-orders" element={<CustomOrders language={language} />} />
          <Route path="/cart" element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              language={language}
              currency={currency}
              isEuro={isEuro}
              isGbp={isGbp}
            />
          } />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} language={language} currency={currency} user={user} isEuro={isEuro} isGbp={isGbp} />} />
          <Route path="/contact" element={<Contact language={language} />} />
          {/* <Route path="/blog" element={<Blog language={language} />} /> */}

          {/* ✅ Admin Routes imbriquées dans AdminLayout */}
          {isAdmin ? (
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          ) : (
            <Route path="/admin/*" element={<NotAdmin language={language} />} />
          )}
          {/* ✅ 404 Page */}
          <Route path="*" element={<NotFound language={language} />} />
        </Routes>

      </main>
      {!isAdminRoute && !isLoginRoute && !isRegisterRoute && <Footer language={language} />}
      {/* Currency Selector */}
      {!isAdminRoute && !isLoginRoute && !isRegisterRoute && <CurrencySelector currency={currency}/>}

    </div>
  )
}

export default App
