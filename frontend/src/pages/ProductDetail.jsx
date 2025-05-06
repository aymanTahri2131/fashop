"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { fetchProductById } from "../api/api"
import { FaArrowLeftLong } from "react-icons/fa6";

// Translation object
const translations = {
  fr: {
    category: "Catégorie",
    description: "Description",
    price: "Prix",
    quantity: "Quantité",
    addToCart: "Ajouter au panier",
    backToShop: "Retour à la boutique",
    added: "Ajouté au panier !",
    notFound: "Produit non trouvé",
  },
  en: {
    category: "Category",
    description: "Description",
    price: "Price",
    quantity: "Quantity",
    addToCart: "Add to Cart",
    backToShop: "Back to Shop",
    added: "Added to cart!",
    notFound: "Product not found",
  },
}

// Mock data for products (same as in Shop.jsx)
const allProducts = [
  {
    id: 1,
    name: { fr: "Vase Terracotta", en: "Terracotta Vase" },
    price: 450,
    image: "/placeholder.svg?height=300&width=300",
    category: { fr: "Vases", en: "Vases" },
    categoryKey: "vases",
    description: {
      fr: "Vase en argile fait à la main avec des motifs naturels.",
      en: "Handmade clay vase with natural patterns.",
    },
    isNew: true,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  // ... other products (same as in Shop.jsx)
]

function ProductDetail({ language, addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const t = translations[language]

  // Fetch product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductById(id); // Fetch product details by ID
        setProduct(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du produit :", error);
        toast.error("Impossible de charger le produit");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Format price
  const formatPrice = (price) => {
    return `${price} MAD`
  }

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = e.target.value;
  
    // Allow empty input but prevent negative or invalid values
    if (value === "" || Number(value) > 0) {
      setQuantity(value === "" ? "" : Number(value)); // Set empty string or valid number
    }
    console.log("Quantity changed:", value);
    
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!quantity || quantity <= 0) {
      toast.error("Veuillez entrer une quantité valide"); // Show an error message
      return;
    }
    if (product) {
      addToCart(product, quantity)
      toast.success(t.added)
    }
  }

  if (loading) {
    return (
      <div className="container-custom py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">{t.notFound}</h2>
          <Link to="/shop" className="btn-primary">
            {t.backToShop}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      <div className="mb-8">
        <Link to="/shop" className="flex items-center hover:text-[#B9703E] transition-colors duration-200 w-40">
          <FaArrowLeftLong className="mr-2" />
          <span>{t.backToShop}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="m-8 aspect-square overflow-hidden rounded-lg bg-[#F0E4CF]/50">
            <img
              src={product.images ? product.images[activeImage] : product.images[0] || "/placeholder.svg"}
              alt={product.name[language]}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 m-8">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${activeImage === index ? "border-[#B9703E]" : "border-transparent"}`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name[language]} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="m-8">
          <div className="flex gap-2 mb-4">
            {product.isBestSeller && (
              <span className="inline-block bg-[#B9703E] text-white text-xs px-2 py-1 rounded mb-2">BEST</span>
            )}
            {product.isNewArrival && (
              <span className="inline-block bg-yellow-300 text-red-500 text-xs px-2 py-1 rounded mb-2">NEW</span>
            )}
          </div>
          <h1 className="text-3xl font-playfair font-semibold mb-2">{product.name[language]}</h1>
          <p className="text-accent mb-4">
            {t.category}: {product.categoryId?.[language]}
          </p>
          <p className="text-2xl font-semibold mb-6">{formatPrice(product.price.mad)}</p>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">{t.description}</h3>
            <p className="text-gray-700">{product.description[language]}</p>
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium mb-2">
              {t.quantity}
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full text-md flex items-center justify-center text-white bg-[#8f974a] px-3 py-2 rounded-lg hover:bg-[#bc6c39] transition-colors duration-200"
          >
            {t.addToCart}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
