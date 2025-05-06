"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { RiHome9Line, RiStoreLine, RiCustomSize, RiMessage2Line } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

// Translation object
const translations = {
  fr: {
    home: "Accueil",
    shop: "Boutique",
    about: "À propos",
    custom: "Personnalisation",
    contact: "Contact",
    blog: "Blog",
    cart: "Panier",
  },
  en: {
    home: "Home",
    shop: "Shop",
    about: "About",
    custom: "Custom Orders",
    contact: "Contact",
    blog: "Blog",
    cart: "Cart",
  },
}

function Header({ cartItemsCount, language, toggleLanguage, user, logout }) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null);

  const location = useLocation()
  const t = translations[language]

  const isActive = (path) => {
    return location.pathname === path ? "text-[#bc6c39] font-medium" : "text-[#212121] hover:text-[#bc6c39]"
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Fermer le dropdown si le clic est en dehors
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Ajouter l'écouteur
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Nettoyer l'écouteur
    };
  }, []);

  return (
    <header className="bg-[#F0E4CF] shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-playfair font-bold text-[#bc6c39]">FlorArt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive("/")} transition-colors duration-200`}>
              {t.home}
            </Link>
            <Link to="/shop" className={`${isActive("/shop")} transition-colors duration-200`}>
              {t.shop}
            </Link>
            <Link to="/about" className={`${isActive("/about")} transition-colors duration-200`}>
              {t.about}
            </Link>
            <Link to="/custom-orders" className={`${isActive("/custom-orders")} transition-colors duration-200`}>
              {t.custom}
            </Link>
            <Link to="/contact" className={`${isActive("/contact")} transition-colors duration-200`}>
              {t.contact}
            </Link>
            {/* <Link to="/blog" className={`${isActive("/blog")} transition-colors duration-200`}>
              {t.blog}
            </Link> */}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Language toggle */}
            <button onClick={toggleLanguage} className="text-[#212121] hover:text-[#bc6c39] transition-colors duration-200">
              {language === "fr" ? "EN" : "FR"}
            </button>

            {/* Cart icon */}
            <Link to="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${isActive("/cart")} h-6 w-6 text-[#212121] hover:text-[#bc6c39] transition-colors duration-200`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#bc6c39] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Profile icon with dropdown */}
            <div ref={dropdownRef} className="flex ">
              <button
                onClick={toggleDropdown}
                className="text-[#212121] hover:text-[#bc6c39] transition-colors duration-200"
              >
                <FaUserCircle size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-10 w-48 bg-[#F0E4CF] border-b border-l border-r border-white rounded-md shadow-lg z-50">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#bc6c39] hover:text-white transition-colors duration-200 rounded-md"
                      >
                        Profile
                      </Link>
                      {user.isAdmin ? (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#bc6c39] hover:text-white transition-colors duration-200 rounded-md"
                        >
                          Admin
                        </Link>
                      ) : (
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#bc6c39] hover:text-white transition-colors duration-200 rounded-md"
                        >
                          Orders
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#bc6c39] hover:text-white transition-colors duration-200 rounded-md"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#bc6c39] hover:text-white transition-colors duration-200 rounded-md"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#F0E4CF] rounded-t-2xl ring-2 ring-[#bc6c39]/30 z-50 md:hidden flex justify-around py-3">
          <Link
            to="/"
            className={`${isActive("/")} flex flex-col items-center justify-center cursor-pointer`}
          >
            <RiHome9Line size={20} />
            <p className="text-sm">{t.home}</p>
          </Link>
          <Link
            to="/shop"
            className={`${isActive("/shop")} flex flex-col items-center justify-center cursor-pointer`}
          >
            <RiStoreLine size={20} />
            <p className="text-sm">{t.shop}</p>
          </Link>
          <Link
            to="/custom-orders"
            className={`${isActive("/custom-orders")} flex flex-col items-center justify-center cursor-pointer`}
          >
            <RiCustomSize size={20} />
            <p className="text-sm">{t.custom}</p>
          </Link>
          <Link
            to="/contact"
            className={`${isActive("/contact")} flex flex-col items-center justify-center cursor-pointer`}
          >
            <RiMessage2Line size={20} />
            <p className="text-sm">{t.contact}</p>
          </Link>

        </div>

      </div>
    </header>
  )
}

export default Header
