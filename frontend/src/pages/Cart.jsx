"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaRegTrashCan } from "react-icons/fa6";

// Translation object
const translations = {
  fr: {
    title: "Panier",
    empty: "Votre panier est vide",
    continueShopping: "Continuer vos achats",
    product: "Produit",
    price: "Prix",
    quantity: "Quantité",
    total: "Total",
    remove: "Supprimer",
    delivery: "Livraison",
    subtotal: "Sous-total",
    checkout: "Passer à la caisse",
    shipping: "Les frais de livraison seront calculés à la caisse",
  },
  en: {
    title: "Cart",
    empty: "Your cart is empty",
    continueShopping: "Continue Shopping",
    product: "Product",
    price: "Price",
    quantity: "Quantity",
    delivery: "Delivery",
    total: "Total",
    remove: "Remove",
    subtotal: "Subtotal",
    checkout: "Checkout",
    shipping: "Shipping costs will be calculated at checkout",
  },
}

function Cart({ cart, updateQuantity, removeFromCart, language, currency, isEuro, isGbp }) {
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const t = translations[language]

  // Calculate subtotal
  useEffect(() => {
    console.log(cart);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(total);
    if (currency === "mad") {
      if (total > 1000) {
        setShippingCost(0);
      } else if (total > 0) {
        setShippingCost(30);
      } else {
        setShippingCost(0);
      }

    } else {
      if (total > 500) {
        setShippingCost(0);
      } else if (total > 0) {
        setShippingCost(20);
      } else {
        setShippingCost(0);
      }
    }

  }, [cart, currency])

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
  const handleQuantityChange = (productId, e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      updateQuantity(productId, value)
    }
  }

  return (
    <div className="container-custom py-16 ">
      <h1 className="section-title text-[#bc6c39]">{t.title}</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500 mb-16">{t.empty}</p>
          <Link to="/shop" className="bg-[#8f974a] text-white px-3 py-2 rounded-lg hover:bg-[#bc6c39] transition-colors duration-200">
            {t.continueShopping}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#F0E4CF] border-b">
                <div className="col-span-6 font-medium">{t.product}</div>
                <div className="col-span-2 font-medium">{t.price}</div>
                <div className="col-span-2 font-medium">{t.quantity}</div>
                <div className="col-span-2 font-medium text-right pr-2">{t.total}</div>
              </div>

              {/* Cart Items */}
              {cart.map((item) => (
                <div key={item.id} className="border-b last:border-b-0">
                  {/* Mobile View */}
                  <div className="md:hidden p-4 grid grid-cols-1 gap-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full bg-[#F0E4CF] overflow-hidden mr-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name[language]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name[language]}</h3>
                        <p className="text-accent text-sm">
                          {item.categoryId?.[language] || "Unknown Category"}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{t.price}</p>
                        <p className="font-medium">{formatPrice(item.price)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{t.quantity}</p>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e)}
                          className="w-16 p-1 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{t.total}</p>
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <FaRegTrashCan size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center">
                    <div className="col-span-6 flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name[language]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name[language]}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm mt-1"
                        >
                          <FaRegTrashCan size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 font-medium">{formatPrice(item.price)}</div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                        className="w-16 py-1 px-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-2 text-right font-semibold">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <h2 className=" font-medium bg-[#F0E4CF] rounded-t-lg p-4 mb-2">{t.subtotal}</h2>
              <div className="flex justify-between items-center p-4">
                <span className="font-medium">{t.subtotal}</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center mb-2 p-4">
                <span className="font-medium">{t.delivery}</span>
                <span className="font-medium">{shippingCost === 0 ? "Gratuite" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 border-t p-4">
                <span>Total</span>
                <span className="font-bold">{formatPrice(subtotal + shippingCost)}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full py-3 bg-[#8f974a] text-white text-center rounded-md hover:bg-[#bc6c39] transition-colors duration-500"
              >
                {t.checkout}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
