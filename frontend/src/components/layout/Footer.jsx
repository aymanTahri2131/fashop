"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { subscribeToNewsletter } from "../../api/api";
import { toast } from "react-toastify";


const translations = {
  fr: {
    newsletter: "Newsletter",
    newsletterDesc: "Inscrivez-vous pour recevoir nos dernières créations et offres spéciales",
    email: "Votre email",
    subscribe: "S'inscrire",
    quickLinks: "Liens rapides",
    shop: "Boutique",
    about: "À propos",
    custom: "Personnalisation",
    contact: "Contact",
    blog: "Blog",
    legal: "Mentions légales",
    terms: "CGV",
    returns: "Politique de retour",
    followUs: "Suivez-nous",
    copyright: "© G2G consulting 2025. Tous droits réservés.",
  },
  en: {
    newsletter: "Newsletter",
    newsletterDesc: "Sign up to receive our latest creations and special offers",
    email: "Your email",
    subscribe: "Subscribe",
    quickLinks: "Quick Links",
    shop: "Shop",
    about: "About",
    custom: "Custom Orders",
    contact: "Contact",
    blog: "Blog",
    legal: "Legal Notice",
    terms: "Terms & Conditions",
    returns: "Return Policy",
    followUs: "Follow Us",
    copyright: "© G2G consulting 2025. All rights reserved. G2G consulting",
  },
}

function Footer({ language }) {
  const [email, setEmail] = useState("")
  const t = translations[language]

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await subscribeToNewsletter(email);
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l’inscription.");
    }
  
    setEmail("");
  };

  return (
    <footer className="bg-[#F0E4CF] pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8 text-center lg:text-start">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-[#B9703E] mb-4">{t.newsletter}</h3>
            <p className="text-[#212121] mb-4">{t.newsletterDesc}</p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.email}
                required
                className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
              />
              <button
                type="submit"
                className="bg-[#8A9A5B] text-white px-4 py-2 rounded-r-md hover:bg-[#B9703E]/90 transition-colors duration-300"
              >
                {t.subscribe}
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-playfair font-semibold text-[#B9703E] mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-[#212121] hover:text-[#B9703E] transition-colors duration-200">
                  {t.shop}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#212121] hover:text-[#B9703E] transition-colors duration-200">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link to="/custom-orders" className="text-[#212121] hover:text-[#B9703E] transition-colors duration-200">
                  {t.custom}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#212121] hover:text-[#B9703E] transition-colors duration-200">
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#212121] hover:text-[#B9703E] transition-colors duration-200">
                  {t.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-xl font-playfair font-semibold text-[#B9703E] mb-4">{t.legal}</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/legal" className="text-[#212121] hover:text-[#B9703E] transition-colors duration-200">
                  {t.legal}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[#212121] hover:text-[#B9703E] transition-colors duration-200">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-[#212121] hover:text-[#B9703E] transition-colors duration-200">
                  {t.returns}
                </Link>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-[#B9703E] mb-4">{t.followUs}</h3>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#212121] hover:text-[#8A9A5B] transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#212121] hover:text-[#8A9A5B] transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#212121] hover:text-[#8A9A5B] transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-text text-sm">{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
