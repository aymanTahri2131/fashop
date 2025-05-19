import Setting from "../models/Setting.js";

// Récupérer les paramètres
export const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Paramètres non trouvés." });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des paramètres." });
  }
};

// Mettre à jour les paramètres
export const updateSettings = async (req, res) => {
  try {
    const updatedSettings = await Setting.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // Crée un document si aucun n'existe
    });
    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour des paramètres." });
  }
};