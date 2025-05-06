import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../api/api";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await registerUser(formData); // Appel à l'API
      toast.success("Inscription réussie !");
      navigate("/login"); // Rediriger vers la page de connexion
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      toast.error(error.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-16">
      <h1 className="text-2xl font-semibold mb-6">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Nom
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Téléphone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#8f974a] text-white py-2 px-4 rounded-md hover:bg-[#6b7a3a] transition-colors duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

export default Register;