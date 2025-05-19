"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast } from "react-toastify";
import { fetchSettings, updateSettings } from "../../api/api";

function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les paramètres
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetchSettings();
        setSettings(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des paramètres.");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Gérer les changements dans les paramètres
  const handleChange = (section, name, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  // Soumettre les paramètres
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(settings);
      toast.success("Paramètres mis à jour avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour des paramètres.");
    }
  };

  if (loading) {
    return <p>Chargement des paramètres...</p>;
  }

  if (!settings) {
    return <p>Aucun paramètre trouvé.</p>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold text-[#B9703E] mb-6">Paramètres</h1>

        <form className="space-y-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
          {/* General Settings */}
          <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#B9703E] mb-4">Paramètres Généraux</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-md font-semibold mb-1">Nom du boutique</label>
                <input
                  type="text"
                  value={settings.general.storeName}
                  onChange={(e) => handleChange("general", "storeName", e.target.value)}
                  className="w-full p-2 border border-gray-300 text-sm font-medium rounded-md"
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={settings.general.storeEmail}
                  onChange={(e) => handleChange("general", "storeEmail", e.target.value)}
                  className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-1">Téléphone</label>
                <input
                  type="text"
                  value={settings.general.storePhone}
                  onChange={(e) => handleChange("general", "storePhone", e.target.value)}
                  className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-1">Logo URL</label>
                <input
                  type="text"
                  value={settings.general.storelogo}
                  onChange={(e) => handleChange("general", "logoUrl", e.target.value)}
                  className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="bg-[#F0E4CF] cust-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#B9703E] mb-4">Paramètres d'Expédition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-md font-semibold mb-1">Tarif Livraison (Maroc)</label>
                <input
                  type="number"
                  value={settings.shipping.flatRateMorocco}
                  onChange={(e) => handleChange("shipping", "flatRateMorocco", e.target.value)}
                  className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-1">Tarif Livraison (Europe)</label>
                <input
                  type="number"
                  value={settings.shipping.flatRateEurop}
                  onChange={(e) => handleChange("shipping", "flatRateEurop", e.target.value)}
                  className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-1">Seuil Livraison Gratuite (Maroc)</label>
                <input
                  type="number"
                  value={settings.shipping.freeShippingThresholdMorocco}
                  onChange={(e) =>
                    handleChange("shipping", "freeShippingThresholdMorocco", e.target.value)
                  }
                  className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-md font-semibold mb-1">Seuil Livraison Gratuite (Europe)</label>
                <input
                  type="number"
                  value={settings.shipping.freeShippingThresholdEurop}
                  onChange={(e) =>
                    handleChange("shipping", "freeShippingThresholdEurop", e.target.value)
                  }
                  className="w-full p-2 text-sm font-medium border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-[#F0E4CF] cust-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#B9703E] mb-4">Paramètres de Paiement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.payment.enableCod}
                    onChange={(e) => handleChange("payment", "enableCod", e.target.checked)}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  Paiement à la Livraison (COD)
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.payment.enablePaypal}
                    onChange={(e) => handleChange("payment", "enablePaypal", e.target.checked)}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  PayPal
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.payment.enableStripe}
                    onChange={(e) => handleChange("payment", "enableStripe", e.target.checked)}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  Stripe
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.payment.enableBankTransfer}
                    onChange={(e) => handleChange("payment", "enableBankTransfer", e.target.checked)}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  Virement Bancaire
                </label>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-[#F0E4CF] cust-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#B9703E] mb-4">Paramètres Email</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.email.orderConfirmation}
                    onChange={(e) => handleChange("email", "orderConfirmation", e.target.checked)}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  Confirmation de Commande
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.email.orderShipped}
                    onChange={(e) => handleChange("email", "orderShipped", e.target.checked)}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  Commande Expédiée
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.email.orderPayed}
                    onChange={(e) => handleChange("email", "orderPayed", e.target.checked)}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  Commande Payée
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.email.abandonedCart}
                    onChange={(e) => handleChange("email", "abandonedCart", e.target.checked)}
                    className="mr-2 accent-[#8A9A5B]"
                  />
                  Panier Abandonné
                </label>
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-[#8A9A5B] text-white rounded-md">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;