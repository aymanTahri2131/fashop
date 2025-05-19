"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { fetchSettings, submitContactMessage } from "../api/api";

// Translation object
const translations = {
  fr: {
    title: "Contactez-nous",
    subtitle: "Nous serions ravis d'avoir de vos nouvelles",
    form: {
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer",
      sending: "Envoi en cours...",
    },
    info: {
      title: "Informations de contact",
      address: "Adresse",
      email: "Email",
      phone: "Téléphone",
      social: "Réseaux sociaux",
    },
    success: "Votre message a été envoyé avec succès !",
  },
  en: {
    title: "Contact Us",
    subtitle: "We would love to hear from you",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send",
      sending: "Sending...",
    },
    info: {
      title: "Contact Information",
      address: "Address",
      email: "Email",
      phone: "Phone",
      social: "Social Media",
    },
    success: "Your message has been sent successfully!",
  },
}

function Contact({ language }) {
  const t = translations[language]
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [settings, setSettings] = useState(null);

  // Charger les paramètres
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetchSettings();
        setSettings(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des paramètres.");
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactMessage(formData);
      toast.success(t.success);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="py-16 bg-[#F0E4CF]/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-[#bc6c39] mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#F0E4CF]/60 rounded-lg shadow-md p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t.form.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t.form.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t.form.subject} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t.form.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#8A9A5B] text-white rounded-md hover:bg-[#bc6c39]/90 transition-colors duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? t.form.sending : t.form.send}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center lg:text-left">
            <div className="bg-[#F0E4CF]/60 rounded-lg shadow-md p-10">
              <h2 className="text-xl font-semibold mb-6 text-[#bc6c39]">{t.info.title}</h2>

              {settings ? (
                <div className="space-y-6">

                  <div>
                    <h3 className="text-md font-medium mb-2">{t.info.email}</h3>
                    <p>
                      <a
                        href={`mailto:${settings.general.storeEmail}`}
                        className="text-gray-600 hover:underline"
                      >
                        {settings.general.storeEmail}
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-md font-medium mb-2">{t.info.phone}</h3>
                    <p>
                      <a
                        href={`tel:${settings.general.storePhone}`}
                        className="hover:underline text-gray-600"
                      >
                        {settings.general.storePhone}
                      </a>
                    </p>
                  </div>

                  <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-md font-medium  mb-2">{t.info.social}</h3>
                    <div className="flex space-x-4 mt-4">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8A9A5B]/80 hover:text-[#8A9A5B] transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8A9A5B]/70 hover:text-[#8A9A5B] transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </a>
                      <a
                        href="https://pinterest.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8A9A5B]/70 hover:text-[#8A9A5B] transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Chargement des informations de contact...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
