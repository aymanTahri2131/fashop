"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { RiHome9Line, RiStoreLine, RiCustomSize, RiMessage2Line } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
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
    frensh: "Français",
    english: "Anglais",
  },
  en: {
    home: "Home",
    shop: "Shop",
    about: "About",
    custom: "Custom Orders",
    contact: "Contact",
    blog: "Blog",
    cart: "Cart",
    frensh: "French",
    english: "English",
  },
}

function Header({ cartItemsCount, language, toggleLanguage, user, logout }) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDropOpen, setIsDropOpen] = useState(false)
  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  }

  const toggleDrop = () => {
    setIsDropOpen((prev) => !prev);
  }

  const handleLanguageClick = (lang) => {
    toggleLanguage(lang);
    localStorage.setItem("language", lang);
    setIsDropOpen(false);
  };

  

  const location = useLocation()
  const t = translations[language]

  const isActive = (path) => {
    return location.pathname === path ? "text-[#bc6c39] font-medium" : "text-[#212121] hover:text-[#bc6c39]"
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setIsDropOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

            {/* Language Dropdown */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                className="text-[#212121] hover:text-[#bc6c39] transition-colors duration-200"
                onClick={toggleDrop}
                
              >
                <MdLanguage size={24} />
              </button>
              {isDropOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#F0E4CF] border border-gray-200 rounded-md shadow-lg z-50">
                  <ul className="py-2">
                    <li
                      className="block cursor-pointer px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white"
                      onClick={() => {
                        handleLanguageClick("fr");
                      }}
                    >
                      <div className="flex items-center space-x-2 ">
                        <span className="w-5">
                        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><g fill-rule="nonzero"><path fill="#999" d="M256 0c70.68 0 134.69 28.66 181.01 74.99C483.34 121.31 512 185.32 512 256c0 70.68-28.66 134.69-74.99 181.01C390.69 483.34 326.68 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.69 74.99-181.01C121.31 28.66 185.32 0 256 0z"/><path fill="#fff" d="M256 19.48c65.29 0 124.45 26.48 167.24 69.27l1.1 1.18c42.14 42.71 68.17 101.37 68.17 166.06 0 65.31-26.49 124.46-69.28 167.25l-1.19 1.09c-42.73 42.16-101.4 68.19-166.04 68.19-65.23 0-124.38-26.51-167.19-69.33-42.84-42.74-69.33-101.89-69.33-167.2 0-65.31 26.48-124.45 69.27-167.24C131.54 45.96 190.69 19.48 256 19.48z"/><path fill="#E1000F" d="M337.87 55.63C416.8 87.92 472.4 165.46 472.4 255.99c0 90.54-55.6 168.09-134.53 200.38V55.63z"/><path fill="#273375" d="M174.14 456.37V55.63C95.21 87.91 39.59 165.44 39.59 255.99c0 90.56 55.62 168.11 134.55 200.38z"/></g></svg>
                        </span>
                        <span>
                          {t.frensh}
                        </span>
                      </div>
                    </li>
                    <li
                      className="block cursor-pointer px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white"
                      onClick={() => {
                        handleLanguageClick("en");
                      }}
                    >
                      <div className="flex items-center space-x-2 ">
                        <span className="w-5">
                          <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><g fill-rule="nonzero"><path fill="#999" d="M256 0c70.68 0 134.69 28.66 181.01 74.99C483.34 121.31 512 185.32 512 256c0 70.68-28.66 134.69-74.99 181.01C390.69 483.34 326.68 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.69 74.99-181.01C121.31 28.66 185.32 0 256 0z"/><path fill="#fff" d="M256 19.48c65.29 0 124.46 26.48 167.25 69.27l1.09 1.18c42.14 42.72 68.17 101.37 68.17 166.06 0 65.31-26.49 124.46-69.28 167.25l-1.19 1.09c-42.72 42.16-101.4 68.19-166.04 68.19-65.23 0-124.38-26.51-167.18-69.33-42.84-42.74-69.34-101.89-69.34-167.2 0-65.31 26.48-124.45 69.27-167.24C131.54 45.96 190.69 19.48 256 19.48z"/><path fill="#B22234" d="M256 39.59c39.48 0 76.49 10.58 108.37 29.04H147.63C179.51 50.17 216.52 39.59 256 39.59zm155.84 66.28c9.16 9.48 17.42 19.82 24.72 30.85H75.43c7.29-11.09 15.59-21.46 24.72-30.85h311.69zm44.41 67.97c4.1 9.97 7.46 20.28 10.04 30.92H45.71c2.61-10.62 6.03-20.9 10.04-30.92h400.5zm15.68 68.08c.3 4.68.47 9.37.47 14.07 0 5.67-.22 11.3-.65 16.85H40.25c-.42-5.59-.65-11.26-.65-16.85 0-4.73.17-9.42.47-14.07h431.86zm-6.32 68.06a212.979 212.979 0 0 1-10.52 30.94H56.91c-4.25-10.02-7.83-20.39-10.52-30.94h419.22zm-30.9 68.06c-7.63 11.14-16.25 21.56-25.78 31.07H103.07c-9.5-9.51-18.15-19.93-25.78-31.07h357.42zm-75.27 68.08c-30.86 16.77-66.16 26.29-103.44 26.29-37.47 0-72.72-9.53-103.44-26.29h206.88z"/><path fill="#3C3B6E" d="M268.16 39.94v234.41H40.39c-.53-6.07-.79-12.16-.79-18.36 0-119.51 96.88-216.4 216.4-216.4 4.08 0 8.14.13 12.16.35z"/><path fill="#fff" d="m50.81 187.06.98 3.06-1.6-1.18.62-1.88zm189.29 49.91 8.01 24.66-20.96-15.25h25.89l-20.97 15.25 8.03-24.66zm0-47.66 8.01 24.62-20.96-15.22h25.89l-20.97 15.22 8.03-24.62zm0-47.69 8.01 24.65-20.96-15.26h25.89l-20.97 15.26 8.03-24.65zm0-47.66 8.01 24.62-20.96-15.23h25.89l-20.97 15.23 8.03-24.62zm0-47.67 8.01 24.63-20.96-15.24h25.89l-20.97 15.24 8.03-24.63zm-28.08 166.85 8.03 24.64-20.98-15.25h25.89l-20.86 15.25 7.92-24.64zm0-47.67 8.03 24.65-20.98-15.26h25.89l-20.86 15.26 7.92-24.65zm0-47.66 8.03 24.62-20.98-15.23h25.89l-20.86 15.23 7.92-24.62zm0-47.7 8.03 24.65-20.98-15.25h25.89L204.1 94.76l7.92-24.65zm-27.97 166.86 8.03 24.66-20.98-15.25h25.91l-20.97 15.25 8.01-24.66zm0-47.66 8.03 24.62-20.98-15.22h25.91l-20.97 15.22 8.01-24.62zm0-47.69 8.03 24.65-20.98-15.26h25.91l-20.97 15.26 8.01-24.65zm0-47.66 8.03 24.62-20.98-15.23h25.91l-20.97 15.23 8.01-24.62zm1.64-42.68 6.39 19.64-19.93-14.48 1.86-.76h23l-20.97 15.24 5.97-18.34 3.68-1.3zm-29.71 161.86 8.01 24.64-20.97-15.25h25.91l-20.98 15.25 8.03-24.64zm0-47.67 8.01 24.65-20.97-15.26h25.91l-20.98 15.26 8.03-24.65zm0-47.66 8.01 24.62-20.97-15.23h25.91l-20.98 15.23 8.03-24.62zm0-47.7 8.01 24.65-20.97-15.25h25.91l-20.98 15.25 8.03-24.65zm-27.97 166.86 7.92 24.66-20.86-15.25h25.89l-20.98 15.25 8.03-24.66zm0-47.66 7.92 24.62-20.86-15.22h25.89l-20.98 15.22 8.03-24.62zm0-47.69 7.92 24.65-20.86-15.26h25.89l-20.98 15.26 8.03-24.65zm0-47.66 7.92 24.62-20.86-15.23h25.89l-20.98 15.23 8.03-24.62zM99.93 213.14l8.03 24.64-20.97-15.25h25.9l-20.97 15.25 8.01-24.64zm0-47.67 8.03 24.65-20.97-15.26h25.9l-20.97 15.26 8.01-24.65zm0-47.66 8.03 24.62-20.97-15.23h25.9l-20.97 15.23 8.01-24.62zM71.87 236.97l8.01 24.66-20.98-15.25h26.02l-21.08 15.25 8.03-24.66zm0-47.66 8.01 24.62-20.98-15.22h26.02l-21.08 15.22 8.03-24.62zm.14-47.26 7.87 24.22-15.36-11.17 2.2-4.09h18.2l-21.08 15.26 7.6-23.32.57-.9zM43.9 213.14l7.89 24.64-10.63-7.77-.47 4.27 16.15-11.75H42.16c.48-3.02 1.02-6.02 1.62-8.99l.12-.4zm11.44-38.28h1.5l-2.14 1.57.64-1.57z"/></g></svg>
                        </span>
                        <span>{t.english}</span>
                      </div>

                    </li>
                  </ul>
                </div>
              )}
            </div>


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

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-[#212121] hover:text-[#bc6c39] transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <FaUserCircle size={24} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#F0E4CF] border border-gray-200 rounded-md shadow-lg z-50">
                  {user ? (
                    <div className="py-2">
                      <Link to="/profile" onClick={toggleDropdown} className="block px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white">
                        Profile
                      </Link>
                      {user.isAdmin && (
                        <Link to="/admin" onClick={toggleDropdown} className="block px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white">
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          toggleDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white">
                        Login
                      </Link>
                      <Link to="/register" className="block px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white">
                        Register
                      </Link>
                    </>
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
