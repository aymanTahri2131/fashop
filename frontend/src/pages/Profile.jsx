import React, { useState, useEffect } from "react";
import { updateUser, fetchOrdersByUser } from "../api/api";
import { toast } from "react-toastify";


function Profile({ user, setUser }) {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [formData, setFormData] = useState({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || "",
    shipping: {
      address: user.shipping?.address || "",
      city: user.shipping?.city || "",
      postalCode: user.shipping?.postalCode || "",
      country: user.shipping?.country || "",
    },
  });

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    if (activeTab === "orders") {
      const loadOrders = async () => {
        setLoadingOrders(true);
        setOrdersError(null);
        try {
          const response = await fetchOrdersByUser(user._id);
          console.log("Fetched orders:", response.data);
          
          setOrders(response.data);
        } catch (err) {
          setOrdersError("Failed to fetch orders. Please try again later.");
        } finally {
          setLoadingOrders(false);
        }
      };
      loadOrders();
    }
  }, [activeTab, user]);

  const formatPrice = (price, isEuro, isGbp, currency) => {
    if (isEuro) {
      return `${price} €`;
    } else if (isGbp) {
      return `${price} £`;
    } else {
      return `${price} ${currency === "usd" ? "$" : "MAD"}`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("shipping.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        shipping: { ...prev.shipping, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(formData);
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setIsEditingShipping(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const statusStyles = {
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  

  return (
    <div className="py-12 bg-[#F0E4CF]/30">
      <div className="container-custom">
        <h1 className="section-title text-[#bc6c39] text-left p-4">Mon Compte</h1>
      </div>

      <main className="container-custom mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-8">
          {/* Carte d'information client */}
          <div className="bg-[#F0E4CF] rounded-lg shadow p-6 flex items-center justify-center max-h-[500px]">
            <div className="grid grid-cols-1 text-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full mx-auto overflow-hidden">
                <img src="https://res.cloudinary.com/doq0mdnkz/image/upload/v1747456131/uwjuudqzqcqodkhvogeg.png" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone || "Téléphone non fourni"}</p>
                <p className="text-sm text-gray-600">{user.shipping?.address || "Adresse non fournie"}</p>
                <p className="text-sm text-gray-600">{user.shipping?.city || "Ville non fournie"}</p>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="col-span-2 bg-[#F0E4CF] rounded-lg shadow p-6">
            <div className="flex space-x-4 border-b border-gray-200 mb-6">
              <button
                className={`py-2 mr-6 ${activeTab === "personalInfo"
                  ? "text-[#bc6c39] font-bold border-b-2 border-[#bc6c39] transition-color duration-200"
                  : "text-gray-600 hover:text-[#bc6c39] transition-color duration-200"
                  }`}
                onClick={() => setActiveTab("personalInfo")}
              >
                Informations personnelles
              </button>
              <button
                className={`py-2 mr-6 text-md ${activeTab === "shipping"
                  ? "text-[#bc6c39] font-bold border-b-2 border-[#bc6c39] transition-color duration-200"
                  : "text-gray-600 hover:text-[#bc6c39] transition-color duration-200"
                  }`}
                onClick={() => setActiveTab("shipping")}
              >
                Adresses
              </button>
              <button
                className={`py-2 mr-6 text-md  ${activeTab === "orders"
                  ? "text-[#bc6c39] font-bold border-b-2 border-[#bc6c39] transition-color duration-200"
                  : "text-gray-600 hover:text-[#bc6c39] transition-color duration-200"
                  }`}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </button>
            </div>

            {/* Contenu des onglets */}
            <div>
              {activeTab === "personalInfo" && (
                <div>
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Prénom</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="mt-1 p-1 pl-2 block w-full md:w-2/3 lg:w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="mt-1 p-1 pl-2 block w-full md:w-2/3 lg:w-1/2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 p-1 pl-2 block w-full md:w-2/3 lg:w-1/2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1 p-1 pl-2 block w-full md:w-2/3 lg:w-1/2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex justify-end w-full md:w-2/3 lg:w-1/2">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="mr-4 bg-[#bc6c39]/70 text-white px-4 py-2 rounded-md hover:bg-[#bc6c39] transition-color duration-200"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="bg-[#8f974a]/80 text-white px-4 py-2 rounded-md hover:bg-[#8f974a] transition-color duration-200"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="mb-2">Nom : {user.firstName} {user.lastName}</p>
                      <p className="mb-2">Email : {user.email}</p>
                      <p className="mb-2">Téléphone : {user.phone || "Non fourni"}</p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 bg-[#8f974a]/80 text-white px-4 py-2 rounded-md hover:bg-[#8f974a] transition-color duration-200"
                      >
                        Modifier
                      </button>
                    </>
                  )}
                </div>
              )}

              {activeTab === "shipping" && (
                <div>
                  {isEditingShipping ? (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Adresse</label>
                        <input
                          type="text"
                          name="shipping.address"
                          value={formData.shipping.address}
                          onChange={handleChange}
                          className="mt-1 p-1 pl-2 block w-full md:w-2/3 lg:w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Ville</label>
                        <input
                          type="text"
                          name="shipping.city"
                          value={formData.shipping.city}
                          onChange={handleChange}
                          className="mt-1 p-1 pl-2 block w-full md:w-2/3 lg:w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Code postal</label>
                        <input
                          type="text"
                          name="shipping.postalCode"
                          value={formData.shipping.postalCode}
                          onChange={handleChange}
                          className="mt-1 p-1 pl-2 block w-full md:w-2/3 lg:w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Pays</label>
                        <input
                          type="text"
                          name="shipping.country"
                          value={formData.shipping.country}
                          onChange={handleChange}
                          className="mt-1 p-1 pl-2 block w-full md:w-2/3 lg:w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex justify-end w-full md:w-2/3 lg:w-1/2">
                        <button
                          type="button"
                          onClick={() => setIsEditingShipping(false)}
                          className="mr-4 bg-[#bc6c39]/70 text-white px-4 py-2 rounded-md hover:bg-[#bc6c39] transition-color duration-200"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="bg-[#8f974a]/80 text-white px-4 py-2 rounded-md hover:bg-[#8f974a] transition-color duration-200"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="mb-2">Adresse : {user.shipping?.address || "Non fourni"}</p>
                      <p className="mb-2">Ville : {user.shipping?.city || "Non fourni"}</p>
                      <p className="mb-2">Code postal : {user.shipping?.postalCode || "Non fourni"}</p>
                      <p className="mb-2">Pays : {user.shipping?.country || "Non fourni"}</p>
                      <button
                        onClick={() => setIsEditingShipping(true)}
                        className="mt-4 bg-[#8f974a]/80 text-white px-4 py-2 rounded-md hover:bg-[#8f974a] transition-color duration-200"
                      >
                        Modifier
                      </button>
                    </>
                  )}
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  {loadingOrders ? (
                    <p className="text-center text-lg">Chargement...</p>
                  ) : ordersError ? (
                    <p className="text-center text-lg text-red-500">{ordersError}</p>
                  ) : orders.length === 0 ? (
                    <p className="text-center text-lg">Vous n'avez pas encore de commandes.</p>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="bg-white/40 border border-gray-200 rounded-lg shadow-md p-6"
                        >
                          <div className="flex justify-between items-center mb-6">
                            <div className="flex gap-4"> 
                              <p className="text-sm text-gray-800">Date: {new Date(order.date).toLocaleDateString()}</p>
                              <p className="text-sm text-gray-800">Total: {formatPrice(order.total, order.isEuro, order.isGbp, order.currency )}</p>
                            </div>
                            <span
                              className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[order.status] || "bg-gray-100 text-gray-700"}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="flex w-full items-start space-x-4 overflow-x-auto gap-4 pb-4">
                            {order.items.map((item) => (
                              <div key={item._id} className="flex items-center space-x-4 ">
                                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md" />
                                <div className="min-w-[130px]">
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-500">Prix: {formatPrice(item.price, order.isEuro, order.isGbp, order.currency )} </p>
                                  <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;