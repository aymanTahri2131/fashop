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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 h-screen">
      <div className="bg-[#F0E4CF] h-full w-full p-16 overflow-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">Créer un compte</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-2">
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
          <div className="mb-2">
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
          <div className="mb-2">
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
          <div className="mb-2">
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
        <p className="mt-8 text-center">
          Déjà un compte ?{" "}
          <a href="/login" className="text-[#8f974a] font-semibold">
            Se connecter
          </a>
        </p>
      </div>
      <div className="w-full relative hidden sm:hidden md:block">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner2.jpg-snw7IxGiKsdC3e087iTR0IKYb4yF3H.jpeg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>
    </div>
  );
}

export default Register;