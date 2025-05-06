import { Link } from "react-router-dom"

// Translation object
const translations = {
  fr: {
    title: "Page non trouvée",
    message: "Désolé, la page que vous recherchez n'existe pas.",
    backHome: "Retour à l'accueil",
  },
  en: {
    title: "Page Not Found",
    message: "Sorry, the page you are looking for does not exist.",
    backHome: "Back to Home",
  },
}

function NotFound({ language }) {
  const t = translations[language]

  return (
    <div className="container-custom py-20">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-playfair font-semibold mb-4">{t.title}</h2>
        <p className="text-lg mb-8">{t.message}</p>
        <Link to="/" className="btn-primary">
          {t.backHome}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
