"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createOrder } from "../api/api";

// Translation object
const translations = {
  fr: {
    title: "Finaliser votre commande",
    summary: "Résumé de la commande",
    product: "Produit",
    quantity: "Quantité",
    price: "Prix",
    subtotal: "Sous-total",
    shipping: "Livraison",
    total: "Total",
    shippingInfo: "Informations de livraison",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    address: "Adresse",
    city: "Ville",
    postalCode: "Code postal",
    country: "Pays",
    paymentMethod: "Méthode de paiement",
    creditCard: "Carte de crédit",
    paypal: "PayPal",
    bankTransfer: "Virement bancaire",
    cardNumber: "Numéro de carte",
    cardHolder: "Titulaire de la carte",
    expiryDate: "Date d'expiration",
    cvv: "CVV",
    placeOrder: "Passer la commande",
    processing: "Traitement en cours...",
    backToCart: "Retour au panier",
    orderSuccess: "Commande passée avec succès !",
  },
  en: {
    title: "Complete Your Order",
    summary: "Order Summary",
    product: "Product",
    quantity: "Quantity",
    price: "Price",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    shippingInfo: "Shipping Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
    paymentMethod: "Payment Method",
    creditCard: "Credit Card",
    paypal: "PayPal",
    bankTransfer: "Bank Transfer",
    cardNumber: "Card Number",
    cardHolder: "Card Holder",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    placeOrder: "Place Order",
    processing: "Processing...",
    backToCart: "Back to Cart",
    orderSuccess: "Order placed successfully!",
  },
}

function Checkout({ cart, clearCart, language, user, currency, isEuro, isGbp }) {
  const t = translations[language]
  const navigate = useNavigate()
  const [subtotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState(50) // Fixed shipping cost
  const [total, setTotal] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("creditCard")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.shipping.address || "",
    city: user?.shipping.city || "",
    postalCode: user?.shipping.postalCode || "",
    country: user?.country || "Morocco",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.shipping.address || "",
        city: user.shipping.city || "",
        postalCode: user.shipping.postalCode || "",
        country: user.country || "Morocco",
      }));
    }
  }, [user]);

  // Calculate totals
  useEffect(() => {
    const calculatedSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(calculatedSubtotal)
    if (calculatedSubtotal > 1000) {
      setShippingCost(0);
    } else if (calculatedSubtotal > 0) {
      setShippingCost(30);
    } else {
      setShippingCost(0);
    }
    setTotal(calculatedSubtotal + shippingCost)
  }, [cart, shippingCost])

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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const orderData = {
      userId: user?._id || null, // ID de l'utilisateur connecté
      customer: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      currency: cart[0]?.currency || "MAD",
      isEuro: cart[0]?.isEuro || false,
      shipping: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      payment: paymentMethod,
      items: cart.map((item) => ({
        name: item.name[language],
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      total,
    };
  
    try {
      const response = await createOrder(orderData); // Appel à l'API
      console.log("Order created:", response.data);
      toast.success(t.orderSuccess);
      clearCart();
      navigate("/"); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de la création de la commande :", error);
      toast.error("Impossible de créer la commande");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if cart is empty
  if (cart.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4 text-[#8f974a]">Your cart is empty</h1>
          <Link to="/shop" className="text-md flex items-center justify-center text-white bg-[#8f974a] px-3 py-2 rounded-lg hover:bg-[#bc6c39] transition-colors duration-200">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      <h1 className="section-title text-[#B9703E]">{t.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1 ">
          <div className="bg-[#F0E4CF]/70 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold pb-4 border-b-2 border-white">{t.summary}</h2>

            {/* Cart Items */}
            <div className="space-y-4 my-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b-2 border-white pb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name[language]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-md font-medium">{item.quantity} x {item.name[language]}</h3>
                    </div>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 border-b-2 border-white pb-4 mb-4">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.shipping}</span>
                <span>{shippingCost === 0 ? "Gratuite" : formatPrice(shippingCost)}</span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>{t.total}</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="mt-6">
              <Link to="/cart" className="text-md flex items-center justify-center text-white bg-[#8f974a] px-3 py-2 rounded-lg hover:bg-[#bc6c39] transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t.backToCart}
              </Link>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <form onSubmit={handleSubmit} className="bg-[#F0E4CF]/70 rounded-lg shadow-sm p-6">
            {/* Shipping Information */}
            <h2 className="text-xl font-semibold pb-4 mb-4 border-b-2 border-white">{t.shippingInfo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 mb-4 border-b-2 border-white ">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  {t.firstName} *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  {t.lastName} *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  {t.phone} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  {t.address} *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  {t.city} *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                  {t.postalCode} *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">
                  {t.country} *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Morocco">Morocco</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                </select>
              </div>
            </div>

            {/* Payment Method */}
            <h2 className="text-xl font-semibold pb-4 mb-4 border-b-2 border-white">{t.paymentMethod}</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={() => handlePaymentMethodChange("creditCard")}
                  className="mr-2"
                />
                <label htmlFor="creditCard">{t.creditCard}</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => handlePaymentMethodChange("paypal")}
                  className="mr-2"
                />
                <label htmlFor="paypal">{t.paypal}</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="bankTransfer"
                  name="paymentMethod"
                  value="bankTransfer"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={() => handlePaymentMethodChange("bankTransfer")}
                  className="mr-2"
                />
                <label htmlFor="bankTransfer">{t.bankTransfer}</label>
              </div>
            </div>

            {/* Credit Card Details */}
            {paymentMethod === "creditCard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="md:col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                    {t.cardNumber} *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="cardHolder" className="block text-sm font-medium mb-2">
                    {t.cardHolder} *
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                    {t.expiryDate} *
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                    {t.cvv} *
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-md flex items-center justify-center text-white bg-[#8f974a] px-3 py-2 rounded-lg hover:bg-[#bc6c39] transition-colors duration-200"
            >
              {isSubmitting ? t.processing : t.placeOrder}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
