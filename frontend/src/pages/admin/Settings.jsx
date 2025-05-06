"use client"

import { useState } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { toast } from "react-toastify"

function Settings() {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "FlorArt",
    storeEmail: "contact@florart.ma",
    storePhone: "+212 600 000 000",
    storeAddress: "123 Rue des Artisans, Marrakech, Morocco",
    currency: "MAD",
    language: "fr",
  })

  const [shippingSettings, setShippingSettings] = useState({
    enableShipping: true,
    flatRate: 50,
    freeShippingThreshold: 1000,
    shippingCountries: ["Morocco", "France", "Spain", "United Kingdom", "United States"],
  })

  const [paymentSettings, setPaymentSettings] = useState({
    enableCreditCard: true,
    enablePaypal: true,
    enableBankTransfer: true,
    testMode: true,
  })

  const [emailSettings, setEmailSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    abandonedCart: false,
    newsletterFrequency: "weekly",
  })

  // Handle general settings change
  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    })
  }

  // Handle shipping settings change
  const handleShippingChange = (e) => {
    const { name, value, type, checked } = e.target
    setShippingSettings({
      ...shippingSettings,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    })
  }

  // Handle payment settings change
  const handlePaymentChange = (e) => {
    const { name, checked } = e.target
    setPaymentSettings({
      ...paymentSettings,
      [name]: checked,
    })
  }

  // Handle email settings change
  const handleEmailChange = (e) => {
    const { name, value, type, checked } = e.target
    setEmailSettings({
      ...emailSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle form submission
  const handleSubmit = (e, section) => {
    e.preventDefault()
    toast.success(`${section} settings saved successfully`)
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold text-[#B9703E] mb-6">Settings</h1>

        <div className="space-y-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#B9703E] mb-4">General Settings</h2>
            <form onSubmit={(e) => handleSubmit(e, "General")}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-md font-semibold mb-1">Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    value={generalSettings.storeName}
                    onChange={handleGeneralChange}
                    className="w-full p-2 border text-sm font-medium border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold mb-1">Store Email</label>
                  <input
                    type="email"
                    name="storeEmail"
                    value={generalSettings.storeEmail}
                    onChange={handleGeneralChange}
                    className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold mb-1">Store Phone</label>
                  <input
                    type="text"
                    name="storePhone"
                    value={generalSettings.storePhone}
                    onChange={handleGeneralChange}
                    className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold mb-1">Store Address</label>
                  <input
                    type="text"
                    name="storeAddress"
                    value={generalSettings.storeAddress}
                    onChange={handleGeneralChange}
                    className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold mb-1">Currency</label>
                  <select
                    name="currency"
                    value={generalSettings.currency}
                    onChange={handleGeneralChange}
                    className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                  >
                    <option value="MAD">Moroccan Dirham (MAD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="GBP">British Pound (GBP)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-md font-semibold mb-1">Default Language</label>
                  <select
                    name="language"
                    value={generalSettings.language}
                    onChange={handleGeneralChange}
                    className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                  >
                    <option value="fr">French</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-[#8A9A5B] text-white rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* Shipping Settings */}
          <div className="bg-[#F0E4CF] cust-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#B9703E] mb-4">Shipping Settings</h2>
            <form onSubmit={(e) => handleSubmit(e, "Shipping")}>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableShipping"
                    checked={shippingSettings.enableShipping}
                    onChange={handleShippingChange}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  <span>Enable Shipping</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-md font-semibold mb-1">Flat Rate Shipping Cost (MAD)</label>
                  <input
                    type="number"
                    name="flatRate"
                    value={shippingSettings.flatRate}
                    onChange={handleShippingChange}
                    disabled={!shippingSettings.enableShipping}
                    className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold mb-1">Free Shipping Threshold (MAD)</label>
                  <input
                    type="number"
                    name="freeShippingThreshold"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={handleShippingChange}
                    disabled={!shippingSettings.enableShipping}
                    className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-md font-semibold mb-1">Shipping Countries</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shippingSettings.shippingCountries.includes("Morocco")}
                      onChange={() => {
                        const updatedCountries = shippingSettings.shippingCountries.includes("Morocco")
                          ? shippingSettings.shippingCountries.filter((c) => c !== "Morocco")
                          : [...shippingSettings.shippingCountries, "Morocco"]
                        setShippingSettings({ ...shippingSettings, shippingCountries: updatedCountries })
                      }}
                      disabled={!shippingSettings.enableShipping}
                      className="mr-2 accent-[#8A9A5B]"
                    />
                    <span>Morocco</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shippingSettings.shippingCountries.includes("France")}
                      onChange={() => {
                        const updatedCountries = shippingSettings.shippingCountries.includes("France")
                          ? shippingSettings.shippingCountries.filter((c) => c !== "France")
                          : [...shippingSettings.shippingCountries, "France"]
                        setShippingSettings({ ...shippingSettings, shippingCountries: updatedCountries })
                      }}
                      disabled={!shippingSettings.enableShipping}
                      className="mr-2 accent-[#8A9A5B]"
                    />
                    <span>France</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shippingSettings.shippingCountries.includes("Spain")}
                      onChange={() => {
                        const updatedCountries = shippingSettings.shippingCountries.includes("Spain")
                          ? shippingSettings.shippingCountries.filter((c) => c !== "Spain")
                          : [...shippingSettings.shippingCountries, "Spain"]
                        setShippingSettings({ ...shippingSettings, shippingCountries: updatedCountries })
                      }}
                      disabled={!shippingSettings.enableShipping}
                      className="mr-2 accent-[#8A9A5B]"
                    />
                    <span>Spain</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shippingSettings.shippingCountries.includes("United Kingdom")}
                      onChange={() => {
                        const updatedCountries = shippingSettings.shippingCountries.includes("United Kingdom")
                          ? shippingSettings.shippingCountries.filter((c) => c !== "United Kingdom")
                          : [...shippingSettings.shippingCountries, "United Kingdom"]
                        setShippingSettings({ ...shippingSettings, shippingCountries: updatedCountries })
                      }}
                      disabled={!shippingSettings.enableShipping}
                      className="mr-2 accent-[#8A9A5B]"
                    />
                    <span>United Kingdom</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shippingSettings.shippingCountries.includes("United States")}
                      onChange={() => {
                        const updatedCountries = shippingSettings.shippingCountries.includes("United States")
                          ? shippingSettings.shippingCountries.filter((c) => c !== "United States")
                          : [...shippingSettings.shippingCountries, "United States"]
                        setShippingSettings({ ...shippingSettings, shippingCountries: updatedCountries })
                      }}
                      disabled={!shippingSettings.enableShipping}
                      className="mr-2 accent-[#8A9A5B]"
                    />
                    <span>United States</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-[#8A9A5B] text-white rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* Payment Settings */}
          <div className="bg-[#F0E4CF] cust-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#B9703E] mb-4">Payment Settings</h2>
            <form onSubmit={(e) => handleSubmit(e, "Payment")}>
              <div className="space-y-4 mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableCreditCard"
                    checked={paymentSettings.enableCreditCard}
                    onChange={handlePaymentChange}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  <span>Enable Credit Card Payments</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="enablePaypal"
                    checked={paymentSettings.enablePaypal}
                    onChange={handlePaymentChange}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  <span>Enable PayPal Payments</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableBankTransfer"
                    checked={paymentSettings.enableBankTransfer}
                    onChange={handlePaymentChange}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  <span>Enable Bank Transfer Payments</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="testMode"
                    checked={paymentSettings.testMode}
                    onChange={handlePaymentChange}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  <span>Test Mode (No real payments will be processed)</span>
                </label>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-[#8A9A5B] text-white rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* Email Settings */}
          <div className="bg-[#F0E4CF] cust-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#B9703E] mb-4">Email Notifications</h2>
            <form onSubmit={(e) => handleSubmit(e, "Email")}>
              <div className="space-y-4 mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="orderConfirmation"
                    checked={emailSettings.orderConfirmation}
                    onChange={handleEmailChange}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  <span>Send Order Confirmation Emails</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="orderShipped"
                    checked={emailSettings.orderShipped}
                    onChange={handleEmailChange}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  <span>Send Order Shipped Emails</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="orderDelivered"
                    checked={emailSettings.orderDelivered}
                    onChange={handleEmailChange}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  <span>Send Order Delivered Emails</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="abandonedCart"
                    checked={emailSettings.abandonedCart}
                    onChange={handleEmailChange}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  <span>Send Abandoned Cart Reminder Emails</span>
                </label>
              </div>

              <div className="mb-6">
                <label className="block text-md font-semibold mb-1">Newsletter Frequency</label>
                <select
                  name="newsletterFrequency"
                  value={emailSettings.newsletterFrequency}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-[#8A9A5B] text-white rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
