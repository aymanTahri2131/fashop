"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchProducts } from "../api/api";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { translations, categoryOptions } from "../data/data";

function Shop({ language, currency, addToCart, priceRange, setPriceRange, isEuro }) {
  const t = translations[language];
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const location = useLocation();

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
        toast.error("Impossible de charger les produits. Veuillez réessayer.");
      }
    };

    loadProducts();
  }, []);

  // Handle category from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catFromURL = params.get("category");

    if (catFromURL) {
      setSelectedCategory(catFromURL);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId?.key === selectedCategory
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price?.[currency] >= priceRange[0] &&
        product.price?.[currency] <= priceRange[1]
    );

    // Sort products
    switch (sortOption) {
      case "priceAsc":
        filtered.sort((a, b) => a.price?.[currency] - b.price?.[currency]);
        break;
      case "priceDesc":
        filtered.sort((a, b) => b.price?.[currency] - a.price?.[currency]);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortOption, currency]);

  // Format price
  const formatPrice = (price) => {
    if (isEuro) {
      return `${price} ${currency === "mad" ? "MAD" : "€"}`;
    } else {
      return `${price} ${currency === "mad" ? "MAD" : "$"}`;
    }
  };

  // Handle add to cart
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(t.added);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, currency === "mad" ? 2000 : 200]);
    setSortOption("newest");
  };

  return (
    <div className="py-12 bg-[#F0E4CF]/30">
      <div className="container-custom">
        <h1 className="section-title text-[#bc6c39] text-left">{t.title}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter */}
          <div className="bg-[#F0E4CF] lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full py-2 px-4 bg-secondary text-primary rounded-md flex items-center justify-between"
            >
              <span>{t.filter}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Filter */}
          <div className={`lg:w-1/4 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}>
            <div className="bg-[#F0E4CF] rounded-lg shadow-sm px-6 py-10 sticky top-24">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{t.categories}</h3>
                {categoryOptions.map(({ key, fr, en }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={key}
                      checked={selectedCategory === key}
                      onChange={() => setSelectedCategory(key)}
                      className="mr-2 accent-[#8f974a]"
                    />
                    {language === "fr" ? fr : en}
                  </label>
                ))}
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{t.price}</h3>
                {isEuro ? (
                  <p className="mb-2">
                    {t.priceRange}: {priceRange[0]} - {priceRange[1]} {currency === "mad" ? "MAD" : "€"}
                  </p>
                ) : (
                  <p className="mb-2">
                    {t.priceRange}: {priceRange[0]} - {priceRange[1]} {currency === "mad" ? "MAD" : "$"}
                  </p>
                )}
                <input
                  type="range"
                  min="0"
                  max={currency === "mad" ? 2000 : 200}
                  step={currency === "mad" ? 200 : 20}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#8f974a]"
                />
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t.sortBy}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full p-2 rounded-md bg-[#8f974a] text-white text-sm"
                  >
                    <option value="newest">{t.newest}</option>
                    <option value="priceAsc">{t.priceAsc}</option>
                    <option value="priceDesc">{t.priceDesc}</option>
                  </select>
                  <button onClick={resetFilters} className="w-full p-2 rounded-md bg-[#8f974a] text-white text-sm">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-card group">
                  <Link to={`/shop/${product._id}`} className="block">
                    <div className="bg-[#F0E4CF] aspect-square overflow-hidden relative">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name[language]}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <div className="flex gap-2">
                          {product.isNewArrival && (
                            <span className="bg-[#8f974a] text-white text-xs px-2 py-1 rounded">
                              NEW
                            </span>
                          )}
                          {product.isBestSeller && (
                            <span className="bg-[#bc6c39] text-white text-xs px-2 py-1 rounded">
                              BEST
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 text-center sm:text-center md:text-left">
                      <h4 className="font-semibold text-lg mb-2">{product.name[language]}</h4>
                      <p className="font-medium">{formatPrice(product.price[currency])}</p>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <div className="flex gap-3 justify-center sm:justify-center md:justify-start">
                      <Link
                        to={`/shop/${product._id}`}
                        className="flex gap-2 w-auto items-center px-2 py-1 bg-transparent text-[#8f974a] border border-[#8f974a] rounded-lg hover:text-white hover:border-none hover:bg-[#8f974a] transition-colors duration-300"
                      >
                        <MdOutlineRemoveRedEye />
                        <span className="hidden sm:hidden md:inline">{t.more}</span>
                      </Link>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="flex gap-2 w-auto items-center px-2 py-1 bg-transparent text-[#8f974a] border border-[#8f974a] rounded-lg hover:text-white hover:border-none hover:bg-[#8f974a] transition-colors duration-300"
                      >
                        <span>
                          <LuShoppingCart />
                        </span>
                        <span className="hidden sm:hidden md:inline">{t.add}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">{t.noProducts}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
