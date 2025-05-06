import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/api";

function Login({ setUser }) {
  const [formData, setFormData] = useState({
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
      const response = await loginUser(formData); // Appel à l'API
      toast.success("Connexion réussie !");
      setUser(response.data); // Mettre à jour l'utilisateur connecté
      navigate("/"); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error(error.response?.data?.message || "Erreur lors de la connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-16">
      <h1 className="text-2xl font-semibold mb-6">Se connecter</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

export default Login;