

export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      // Si l'utilisateur est connecté et est un administrateur
      next(); // Autoriser l'accès
    } else {
      // Sinon, renvoyer une erreur 403 (Accès interdit)
      res.status(403).json({ message: "Accès interdit : Administrateurs uniquement." });
    }
  };
  