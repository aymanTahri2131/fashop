"use client"

import { Carousel, IconButton } from "@material-tailwind/react"
import { useEffect, useState } from "react";
import { fetchNewArrivals, fetchBestSellers } from "../api/api";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

const translations = {
  fr: {
    heroTitle: "Art de la poterie fait main",
    heroSubtitle: "Des créations uniques inspirées par la nature",
    shopNow: "Voir la boutique",
    discoverTitle: "Découvrez nos créations",
    discoverDesc: "Chaque pièce est façonnée à la main avec soin et passion",
    newArrivals: "Nouveautés",
    bestSellers: "Meilleurs ventes",
    viewAll: "Voir tout",
  },
  en: {
    heroTitle: "Handmade Pottery Art",
    heroSubtitle: "Unique creations inspired by nature",
    shopNow: "Shop Now",
    discoverTitle: "Discover our creations",
    discoverDesc: "Each piece is carefully handcrafted with care and passion",
    newArrivals: "New Arrivals",
    bestSellers: "Best Sellers",
    viewAll: "View All",
  },
}

const categories = [
  {
    key: "vases",
    name: { fr: "Vases", en: "Vases" },
    image: "https://res.cloudinary.com/doq0mdnkz/image/upload/v1745457048/vase_jolwbo.png",
  },
  {
    key: "cups",
    name: { fr: "Tasses", en: "Mugs" },
    image: "https://res.cloudinary.com/doq0mdnkz/image/upload/v1745462394/Pngtree_orange_coffee_mug_clipart_illustration_16273133_q4etnu.png",
  },
  {
    key: "wall-decoration",
    name: { fr: "Décoration murale", en: "Wall decoration" },
    image: "https://res.cloudinary.com/doq0mdnkz/image/upload/v1745458370/Pngtree_a_round_red_decorative_plate_20759669_oidjqm.png",
  },
  {
    key: "unique-pieces",
    name: { fr: "Pièces uniques", en: "Unique pieces" },
    image: "https://res.cloudinary.com/doq0mdnkz/image/upload/v1745462698/Pngtree_pottery_wheel_pottery_workshop_14993938_sfolk4.png",
  },
]

const carouselItems = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner.jpg-6YGlYomaEwH5MkZ1JzG8A5l3rHmkWq.jpeg",
    title: { fr: "Art de la poterie fait main", en: "Handmade Pottery Art" },
    desc: { fr: "Des créations uniques inspirées par la nature", en: "Unique creations inspired by nature" },
    button: { fr: "Voir la boutique", en: "Shop Now" },
    link: "/shop" // Lien associé au bouton
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner2.jpg-snw7IxGiKsdC3e087iTR0IKYb4yF3H.jpeg",
    title: { fr: "Collections Uniques", en: "Unique Collections" },
    desc: { fr: "Des pieces artisanales aux motifs traditionnels", en: "Handcrafted pieces with traditional patterns" },
    button: { fr: "Découvrir", en: "Discover our creations" },
    link: "/shop" // Lien associé au bouton
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner3-dzo3p1Xlm67kuFZNUqpweROQu9N1us.png",
    desc: { fr: "Chaque pièce est façonnée à la main avec soin et passion", en: "Each piece is carefully handcrafted with care and passion" },
    title: { fr: "Savoir-faire artisanal", en: "Craftsmanship" },
    button: { fr: "Voir tout", en: "View All" },
    link: "/shop" // Lien associé au bouton
  },
];

function Home({ language }) {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  const t = translations[language]

  // Format price
  const formatPrice = (price) => {
    return `${price} MAD`
  }

  useEffect(() => {
    // Récupérer les nouveaux arrivages
    const getNewArrivals = async () => {
      try {
        const products = await fetchNewArrivals();
        setNewArrivals(products.slice(0, 4));
      } catch (error) {
        console.error("Erreur lors de la récupération des nouveaux arrivages :", error);
      }
    };

    // Récupérer les best-sellers
    const getBestSellers = async () => {
      try {
        const products = await fetchBestSellers();
        setBestSellers(products.slice(0, 4));
      } catch (error) {
        console.error("Erreur lors de la récupération des best-sellers :", error);
      }
    };

    getNewArrivals();
    getBestSellers();
  }, []);

  return (
    <div className="bg-[#F0E4CF]/30">
      {/* Hero Section with Carousel */}
      <section className="relative h-[70vh] lg:h-[80vh]">
        <Carousel
          className="h-full rounded-none"
          autoplay
          loop
          transition={{ duration: 1 }}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-[#bc6c39]" : "w-4 bg-[#e9d5be]"
                    }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 right-4 -translate-y-2/4"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </IconButton>
          )}
        >
          {carouselItems.map((item, i) => (
            <div key={i} className="relative h-full w-full">
              <img
                src={item.image}
                alt={`Slide ${i + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 z-10" />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-4">
                <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4">{item.title[language]}</h1>
                <p className="hero-subtitle text-xl md:text-2xl max-w-2xl mb-8">{item.desc[language]}</p>
                <Link to="/shop" className="hero-cta btn-primary text-lg">
                  {item.button[language]}
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Discover categories Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-[#bc6c39]">{t.discoverTitle}</h2>
          <p className="text-center text-lg max-w-2xl mx-auto mb-12 text-[#bc6c39]">{t.discoverDesc}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {categories.map((cat) => (
                <Link to={`/shop?category=${cat.key.toLowerCase().replace(/\s+/g, "-")}`} key={cat.key} className="w-full bg-transparent rounded-lg m-2 flex flex-col justify-center items-center">
                  <div className="mb-5 ">
                    <img
                      src={cat.image || "/placeholder.svg"}
                      alt={cat.name[language]}
                      className="object-center object-cover transition-transform duration-500 bg-[#F0E4CF] rounded-full h-48 w-48 hover:scale-105"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium text-[#bc6c39] mb-2">{cat.name[language]}</p>
                  </div>
                </Link>
              ))}
            </div>

        </div>
      </section>

      {/* New Arrivals section*/}
      <section className="bg-[#8f974a]/20 py-16">
        <div className="container-custom">

          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-playfair font-semibold text-[#8f974a]">{t.newArrivals}</h3>
              <Link to="/shop" className="bg-[#8f974a] text-white px-3 py-2 rounded-lg hover:bg-[#bc6c39] transition-colors duration-200">
                {t.viewAll} →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <Link to={`/shop/${product._id}`} key={product._id} className="product-card">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name[language]}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-md font-medium text-[#bc6c39] mb-1">{product.categoryId?.[language]}</p>
                    <h4 className="text-sm mb-2 text-black">{product.name[language]}</h4>
                    <p className="font-semibold text-black">{formatPrice(product.price.mad)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best selling section */}
      <section className="py-16">
        <div className="container-custom">

          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-playfair font-semibold text-[#bc6c39]">{t.bestSellers}</h3>
              <Link to="/shop" className="bg-[#bc6c39] text-white px-3 py-2 rounded-lg hover:bg-[#8f974a] transition-colors duration-200">
                {t.viewAll} →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <Link to={`/shop/${product._id}`} key={product._id} className="product-card">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name[language]}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-accent mb-1">{product.categoryId?.[language]}</p>
                    <h4 className="font-medium mb-2">{product.name[language]}</h4>
                    <p className="font-semibold text-primary">{formatPrice(product.price.mad)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
