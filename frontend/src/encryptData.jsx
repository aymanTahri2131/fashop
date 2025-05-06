import CryptoJS from "crypto-js";

const SECRET_KEY = "@zh@r.folr@rt_21_31@18-01-@@@//.001.flowers"; // Remplacez par une clé secrète sécurisée

// Chiffrer les données
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Déchiffrer les données
export const decryptData = (cipherText) => {
    try {
        if (!cipherText) throw new Error("Données vides ou nulles");
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData); // Retourner les données déchiffrées
    } catch (error) {
        console.error("Erreur lors du déchiffrement :", error);
        return null; // Retourner `null` si les données sont invalides
    }
};