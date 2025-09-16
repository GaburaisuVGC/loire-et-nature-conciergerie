// backend/src/middlewares/uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Générer un nom unique pour éviter les conflits
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9]/g, '_') // Remplacer les caractères spéciaux
      .substring(0, 50); // Limiter la longueur du nom
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// Filtre pour les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  // Types MIME acceptés
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Type de fichier non autorisé: ${file.mimetype}. Types acceptés: images (jpg, png, gif, webp), PDF, documents Word et Excel`), false);
  }
};

// Configuration de multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // Limite à 20MB par fichier
    files: 5 // Maximum 5 fichiers par requête
  }
});

// Middleware pour gérer plusieurs fichiers
export const uploadMultiple = upload.array('attachments', 5);

// Middleware pour gérer un seul fichier
export const uploadSingle = upload.single('attachment');

// Fonction pour nettoyer les fichiers temporaires après envoi
export const cleanupFiles = (files) => {
  if (!files || files.length === 0) return;
  
  files.forEach(file => {
    if (file.path && fs.existsSync(file.path)) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Erreur lors de la suppression du fichier ${file.path}:`, err);
        } else {
          console.log(`Fichier temporaire supprimé: ${file.path}`);
        }
      });
    }
  });
};

export default upload;