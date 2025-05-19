"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { fetchProductById, addTestimonial, fetchTestimonialsByProductId } from "../api/api"
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

function ProductDetail({ language, addToCart, currency, isEuro, isGbp }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [activeImage, setActiveImage] = useState(0)
  const [testimonial, setTestimonial] = useState({
    name: "",
    rating: 5,
    content: "",
  });
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

  // Fetch testimonials by productId
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoadingTestimonials(true);
        const response = await fetchTestimonialsByProductId(id); // Fetch testimonials by productId
        console.log(response.data);

        setTestimonials(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des témoignages :", error);
        toast.error("Impossible de charger les témoignages.");
      } finally {
        setLoadingTestimonials(false);
      }
    };

    loadTestimonials();
  }, [id]);

  // Handle testimonial form submission
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      const testimonialData = { ...testimonial, productId: id };
      await addTestimonial(testimonialData);
      toast.success("Votre témoignage a été soumis avec succès !");
      setTestimonial({ name: "", rating: 5, content: "" }); // Reset form
    } catch (error) {
      console.error("Erreur lors de l'ajout du témoignage :", error);
      toast.error("Impossible de soumettre le témoignage.");
    }
  };

  // Handle testimonial input changes
  const handleTestimonialChange = (e) => {
    const { name, value } = e.target;
    setTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  // Format price
  const formatPrice = (price) => {
    if (isEuro) {
      return `${price} €`;
    } else if (isGbp) {
      return `${price} £`;
    } else {
      return `${price} ${currency === "usd" ? "$" : "MAD"}`;
    }
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
          <p className="text-2xl font-semibold mb-6">{formatPrice(product.price?.[currency])}</p>

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

      {/* Testimonial Form */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-semibold mb-4">Ajouter un témoignage</h2>
          <form onSubmit={handleTestimonialSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                name="name"
                value={testimonial.name}
                onChange={handleTestimonialChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Note</label>
              <select
                name="rating"
                value={testimonial.rating}
                onChange={handleTestimonialChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="1">1 Étoile</option>
                <option value="2">2 Étoiles</option>
                <option value="3">3 Étoiles</option>
                <option value="4">4 Étoiles</option>
                <option value="5">5 Étoiles</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Témoignage</label>
              <textarea
                name="content"
                value={testimonial.content}
                onChange={handleTestimonialChange}
                required
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8f974a] text-white rounded-md hover:bg-[#bc6c39] transition-colors duration-200"
            >
              Soumettre
            </button>
          </form>
        </div>

        {/* Testimonial Display */}
        <div className="flex flex-col items-center">
          {product.testimonials && product.testimonials.length > 0 && (
            <h2 className="text-2xl font-semibold mb-4">Témoignages</h2>
          )}
          {loadingTestimonials ? (
            <p>Chargement des témoignages...</p>
          ) : testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <div key={index} className="border p-4 rounded-md mb-4 w-full">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-yellow-500">{'⭐'.repeat(testimonial.rating)}</p>
                </div>
                <div className="flex gap-4 mb-2">
                <p className="text-sm text-gray-500">{testimonial.date.split("T")[0]}</p>
                  <p className="text-sm text-gray-500">a {testimonial.location}</p>
                  
                </div>

                <p>{testimonial.content}</p>
              </div>
            ))
          ) : (
            <p>Aucun témoignage pour ce produit.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
