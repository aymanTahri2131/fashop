"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { submitCustomOrder } from "../api/api";


// Translation object
const translations = {
  fr: {
    title: "Commandes Personnalisées",
    subtitle: "Créez une pièce unique qui correspond à votre vision",
    gallery: {
      title: "Galerie d'inspiration",
      desc: "Voici quelques exemples de nos créations personnalisées précédentes",
    },
    form: {
      title: "Demande de personnalisation",
      desc: "Parlez-nous de votre projet et nous vous contacterons pour discuter des détails",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      type: "Type de produit",
      typeOptions: {
        vase: "Vase",
        mug: "Tasse",
        plate: "Assiette",
        bowl: "Bol",
        wallArt: "Décoration murale",
        other: "Autre",
      },
      description: "Description de votre projet",
      descriptionPlaceholder: "Décrivez votre idée, dimensions souhaitées, couleurs, etc.",
      budget: "Budget approximatif (MAD)",
      timeline: "Délai souhaité",
      timelineOptions: {
        flexible: "Flexible",
        month: "Dans le mois",
        twoMonths: "Dans les 2 mois",
        threeMonths: "Dans les 3 mois",
      },
      reference: "Image de référence (optionnel)",
      submit: "Envoyer la demande",
      sending: "Envoi en cours...",
    },
    success: "Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.",
  },
  en: {
    title: "Custom Orders",
    subtitle: "Create a unique piece that matches your vision",
    gallery: {
      title: "Inspiration Gallery",
      desc: "Here are some examples of our previous custom creations",
    },
    form: {
      title: "Custom Order Request",
      desc: "Tell us about your project and we will contact you to discuss the details",
      name: "Name",
      email: "Email",
      phone: "Phone",
      type: "Product Type",
      typeOptions: {
        vase: "Vase",
        mug: "Mug",
        plate: "Plate",
        bowl: "Bowl",
        wallArt: "Wall Art",
        other: "Other",
      },
      description: "Project Description",
      descriptionPlaceholder: "Describe your idea, desired dimensions, colors, etc.",
      budget: "Approximate Budget (MAD)",
      timeline: "Desired Timeline",
      timelineOptions: {
        flexible: "Flexible",
        month: "Within a month",
        twoMonths: "Within 2 months",
        threeMonths: "Within 3 months",
      },
      reference: "Reference Image (optional)",
      submit: "Submit Request",
      sending: "Sending...",
    },
    success: "Your request has been sent successfully! We will contact you soon.",
  },
}

// Mock data for gallery
const galleryItems = [
  {
    id: 1,
    image: "https://res.cloudinary.com/doq0mdnkz/image/upload/v1745458370/Pngtree_a_round_red_decorative_plate_20759669_oidjqm.png",
    title: { fr: "Vase personnalisé", en: "Custom Vase" },
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/95/58/56/95585660575e9c7565e8488578680d65.jpg",
    title: { fr: "Ensemble de tasses", en: "Custom Mug Set" },
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/f5/9b/ff/f59bffc2fb4412ceb91b6ccc0c431808.jpg",
    title: { fr: "Décoration murale", en: "Wall Decoration" },
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/doq0mdnkz/image/upload/v1745457048/vase_jolwbo.png",
    title: { fr: "Assiettes sur mesure", en: "Custom Plates" },
  },
  {
    id: 5,
    image: "https://i.pinimg.com/736x/ca/fb/41/cafb41a5d6d08c885e9b3b394aed3d91.jpg",
    title: { fr: "Sculpture personnalisée", en: "Custom Sculpture" },
  },
  {
    id: 6,
    image: "https://i.pinimg.com/736x/d6/83/72/d68372696cb39a8fc4eb1e7db3b970dd.jpg",
    title: { fr: "Bols assortis", en: "Matching Bowls" },
  },
]

function CustomOrders({ language }) {
  const t = translations[language]
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    description: "",
    budget: "",
    timeline: "",
    reference: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, reference: file }))

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });
  
    try {
      await submitCustomOrder(form);
      toast.success(t.success);
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "",
        description: "",
        budget: "",
        timeline: "",
        reference: null,
      });
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi.");
    }
  
    setIsSubmitting(false);
  };

  return (
    <div className="py-16 bg-[#F0E4CF]/30">
      <div className="container-custom ">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-[#bc6c39] mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Gallery Section */}
        <section className="mb-16">
          <h2 className="text-center font-semibold text-2xl mb-6 text-[#bc6c39]">{t.gallery.title}</h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-lg shadow-sm group">
                <div className="relative aspect-square bg-gray-200">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="text-white text-xl font-medium px-4 text-center">{item.title[language]}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Order Form */}
        <section className="">
          <div className=" rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-playfair font-semibold text-[#bc6c39] mb-2">{t.form.title}</h2>
            <p className="text-gray-600 mb-6">{t.form.desc}</p>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t.form.phone} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-2">
                    {t.form.type} *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                  >
                    <option value="" disabled>
                      -- {t.form.type} --
                    </option>
                    <option value="vase">{t.form.typeOptions.vase}</option>
                    <option value="mug">{t.form.typeOptions.mug}</option>
                    <option value="plate">{t.form.typeOptions.plate}</option>
                    <option value="bowl">{t.form.typeOptions.bowl}</option>
                    <option value="wallArt">{t.form.typeOptions.wallArt}</option>
                    <option value="other">{t.form.typeOptions.other}</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  {t.form.description} *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={t.form.descriptionPlaceholder}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                ></textarea>
              </div>

              

              <div className="mb-8">
                <label htmlFor="reference" className="block text-sm font-medium mb-2">
                  {t.form.reference}
                </label>
                <input
                  type="file"
                  id="reference"
                  name="reference"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                />
                {previewImage && (
                  <div className="mt-2">
                    <img src={previewImage || "/placeholder.svg"} alt="Reference" className="h-32 object-contain" />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#8A9A5B] text-white rounded-md hover:bg-[#bc6c39]/90 transition-colors duration-300 disabled:opacity-70"
              >
                {isSubmitting ? t.form.sending : t.form.submit}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CustomOrders
