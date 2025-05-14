"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { RiHome9Line, RiStoreLine, RiCustomSize, RiMessage2Line } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Flag from 'react-flagpack'

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

function Header({ cartItemsCount, language, toggleLanguage, toggleCurrency, user, logout, setPriceRange, setIsEuro }) {

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

  const handleOptionClick = (lang, curr) => {
    toggleLanguage(lang);
    toggleCurrency(curr);
    setPriceRange(curr === "mad" ? [0, 2000] : [0, 200]);
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

            {/* Language and Currency Dropdown */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                className="text-[#212121] hover:text-[#bc6c39] transition-colors duration-200"
                onClick={toggleDrop}
                aria-haspopup="true"
                aria-expanded={isDropOpen}
              >
                <MdLanguage size={24} />
              </button>
              {isDropOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#F0E4CF] border border-gray-200 rounded-md shadow-lg z-50">
                  <ul className="py-2">
                    <li
                      className="block cursor-pointer px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white"
                      onClick={() => {
                        handleOptionClick("fr", "mad");
                        setIsEuro(false);
                      }}
                    >
                      <div className="flex items-center space-x-2 ">
                        <span className="w-5">
                          <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><g fill-rule="nonzero"><path fill="#4D4D4D" d="M256 0c70.683 0 134.689 28.663 181.012 74.987C483.336 121.311 512 185.316 512 256c0 70.683-28.664 134.689-74.988 181.012C390.689 483.336 326.683 512 256 512c-70.677 0-134.689-28.664-181.013-74.988C28.663 390.689 0 326.676 0 256c0-70.684 28.663-134.689 74.987-181.013C121.311 28.663 185.316 0 256 0z" /><path fill="#fff" d="M256.001 19.596c65.278 0 124.383 26.467 167.162 69.243 42.777 42.78 69.243 101.884 69.243 167.162S465.94 380.384 423.16 423.16c-42.776 42.78-101.881 69.246-167.159 69.246-65.278 0-124.382-26.466-167.162-69.243-42.776-42.779-69.243-101.884-69.243-167.162S46.063 131.619 88.839 88.839c42.78-42.776 101.884-69.243 167.162-69.243z" /><path fill="#C1272D" d="M256.001 39.594c119.518 0 216.407 96.887 216.407 216.407 0 119.518-96.889 216.407-216.407 216.407-119.52 0-216.407-96.889-216.407-216.407 0-119.52 96.887-216.407 216.407-216.407z" /><path fill="#006233" d="M260.913 172.688l19.517 60.067h79.085l-63.982 46.485 24.432 75.192-63.963-46.471-63.963 46.471 24.431-75.192-63.982-46.485h79.085l24.429-75.184 4.911 15.117zm22.879 70.416l8.384 25.802 35.514-25.802h-43.898zm16.523 84.279l-13.568-41.759-21.955 15.951 35.523 25.808zm-16.926-52.093l-10.458-32.186h-33.859l-10.458 32.186 27.388 19.898 27.387-19.898zm-13.82-42.535l-13.567-41.757-13.567 41.757h27.134zm-22.358 68.82l-21.954-15.951-13.568 41.759 35.522-25.808zm-62.898-58.471l35.515 25.802 8.383-25.802h-43.898z" /></g></svg>
                        </span>
                        <span>
                          FR - MAD
                        </span>
                      </div>
                    </li>
                    <li
                      className="block cursor-pointer px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white"
                      onClick={() => {
                        handleOptionClick("fr", "usd");
                        setIsEuro(true);
                      }}
                    >
                      <div className="flex items-center space-x-2 ">
                        <span className="w-5">
                          <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><g fill-rule="nonzero"><path fill="#4D4D4D" d="M256 0c70.684 0 134.689 28.663 181.013 74.987C483.337 121.31 512 185.316 512 256c0 70.684-28.663 134.689-74.987 181.013C390.689 483.336 326.684 512 256 512c-70.676 0-134.689-28.664-181.013-74.987C28.664 390.689 0 326.676 0 256c0-70.684 28.664-134.69 74.987-181.013C121.311 28.663 185.316 0 256 0z" /><path fill="#fff" d="M256.002 19.596c65.279 0 124.383 26.462 167.161 69.24 42.772 42.777 69.239 101.885 69.239 167.164 0 65.28-26.462 124.384-69.239 167.161-42.778 42.777-101.882 69.239-167.161 69.239-65.28 0-124.388-26.466-167.165-69.239C46.06 380.384 19.598 321.28 19.598 256c0-65.279 26.466-124.387 69.239-167.164 42.777-42.774 101.885-69.24 167.165-69.24z" /><path fill="#039" d="M256.002 39.591c119.517 0 216.404 96.892 216.404 216.409s-96.887 216.405-216.404 216.405C136.48 472.405 39.593 375.517 39.593 256S136.48 39.591 256.002 39.591z" /><path fill="#FFCC02" d="M240.694 435.8L256 424.679l15.305 11.121-5.845-17.995 15.305-11.12h-18.918L256 388.69l-5.848 17.995h-18.918l15.305 11.12-5.845 17.995zM256 76.196l-5.848 17.993h-18.918l15.305 11.122-5.845 17.992L256 112.183l15.305 11.12-5.845-17.994 15.305-11.12h-18.918L256 76.196zm102.889 309.555l-15.305 11.12 5.845 17.995-15.305-11.12-15.308 11.12 5.847-17.995-15.308-11.12h18.921l5.848-17.994 5.845 17.994h18.92zm57.191-57.19l-15.306 11.12 5.846 17.995-15.306-11.121-15.308 11.121 5.848-17.995-15.308-11.12h18.92l5.848-17.995 5.848 17.995h18.918zm-24.766-174.243l5.848 17.995h18.918l-15.306 11.12 5.846 17.994-15.306-11.12-15.308 11.12 5.848-17.994-15.308-11.12h18.92l5.848-17.995zm-81.959-39.196h18.921l5.848-17.995 5.847 17.995h18.918l-15.308 11.123 5.848 17.992-15.305-11.12-15.308 11.12 5.847-17.992-15.308-11.123zm118.198 164.429l-15.305-11.12-15.308 11.12 5.847-17.994-15.308-11.12H406.4l5.848-17.995 5.847 17.995h18.918l-15.305 11.122 5.845 17.992zm-274.443 106.2l15.305 11.12-5.845 17.995 15.306-11.12 15.307 11.12-5.847-17.995 15.308-11.12h-18.921l-5.847-17.994-5.846 17.994h-18.92zm-57.191-57.19l15.306 11.12-5.845 17.995 15.305-11.121 15.308 11.121-5.848-17.995 15.308-11.12h-18.92l-5.848-17.995-5.848 17.995H95.919zm24.766-174.243l-5.848 17.995H95.919l15.306 11.12-5.845 17.994 15.305-11.12 15.308 11.12-5.848-17.994 15.308-11.12h-18.92l-5.848-17.995zm81.959-39.196h-18.921l-5.847-17.995-5.848 17.995H153.11l15.308 11.123-5.848 17.992 15.306-11.12 15.307 11.12-5.847-17.992 15.308-11.123zM84.446 279.551l15.305-11.12 15.308 11.12-5.847-17.994 15.308-11.12h-18.921l-5.848-17.995-5.847 17.995H74.986l15.305 11.122-5.845 17.992z" /></g></svg>
                        </span>
                        <span>FR - €</span>
                      </div>

                    </li>
                    <li
                      className="block cursor-pointer px-4 py-2 rounded-md hover:bg-[#bc6c39] hover:text-white"
                      onClick={() => {
                        handleOptionClick("en", "usd");
                        setIsEuro(false);
                      }}
                    >
                      <div className="flex items-center space-x-2 ">
                        <span className="w-5">
                          <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><g fill-rule="nonzero"><path fill="#999" d="M256 0c70.68 0 134.69 28.66 181.01 74.99C483.34 121.31 512 185.32 512 256c0 70.68-28.66 134.69-74.99 181.01C390.69 483.34 326.68 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.69 74.99-181.01C121.31 28.66 185.32 0 256 0z" /><path fill="#fff" d="M256 19.48c65.3 0 124.46 26.48 167.25 69.27l1.09 1.18c42.14 42.71 68.18 101.37 68.18 166.06 0 65.31-26.5 124.46-69.29 167.25l-1.18 1.09c-42.73 42.16-101.4 68.19-166.05 68.19-65.23 0-124.37-26.51-167.18-69.33-42.84-42.74-69.33-101.89-69.33-167.2 0-65.31 26.48-124.45 69.27-167.24C131.55 45.96 190.7 19.48 256 19.48z" /><path fill="#FEFEFE" d="M256 39.59c119.52 0 216.41 96.89 216.41 216.4 0 119.52-96.89 216.42-216.41 216.42-119.51 0-216.4-96.9-216.4-216.42 0-119.51 96.89-216.4 216.4-216.4z" /><path fill="#012169" d="M183.49 179.55V52.05c-41.32 14.7-76.85 41.61-102.27 76.35l102.27 51.15zm0 152.9v127.5c-41.3-14.7-76.82-41.59-102.26-76.35l102.26-51.15zm144.55 0v127.67c41.45-14.63 77.09-41.54 102.61-76.34l-102.61-51.33zm0-152.9V51.88c41.45 14.63 77.11 41.54 102.62 76.35l-102.62 51.32z" /><path fill="#C8102E" d="M448.3 328.16h-48.11l49.35 24.72c3.21-6.41 6.11-13 8.69-19.75l-9.93-4.97zm-9.34-187.76-86.42 43.33h48.11l48.95-24.5c-3.23-6.46-6.79-12.75-10.64-18.83zM212.41 299.26v168.75c14.08 2.87 28.66 4.4 43.59 4.4 14.76 0 29.19-1.49 43.13-4.3V299.26h168.94c2.83-13.98 4.34-28.44 4.34-43.27 0-14.88-1.51-29.42-4.37-43.47H299.13V43.9A217.404 217.404 0 0 0 256 39.59c-14.93 0-29.51 1.54-43.59 4.4v168.53H43.97a217.777 217.777 0 0 0-4.37 43.47c0 14.83 1.51 29.29 4.34 43.27h168.47zM63.12 183.84h48.11l-48.89-24.48c-3.2 6.41-6.11 13.02-8.68 19.76l9.46 4.72zm95.87 144.43h-48.11l-48.57 24.31A216.76 216.76 0 0 0 73 371.52l86.43-43.25h-.44z" /></g></svg>
                        </span>
                        <span>EN - $</span>
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
