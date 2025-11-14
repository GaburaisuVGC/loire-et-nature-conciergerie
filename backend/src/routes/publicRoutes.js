import { Router } from 'express';
import { Testimonial } from '../models/Testimonial.js';
import emailService from '../services/emailService.js';
import { uploadMultiple, cleanupFiles } from '../middlewares/uploadMiddleware.js';
import { Beds24Service } from '../services/beds24Service.js';
import { PropertyKeysService } from '../services/propertyKeysService.js';
const beds24Service = new Beds24Service();
const { getProperties, getAvailabilities, getPropertyContent } = beds24Service;

const router = Router();

// Middleware pour gérer les erreurs d'upload
const handleUploadError = (err, req, res, next) => {
  if (err) {
    console.error('Erreur d\'upload:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'Fichier trop volumineux. Taille maximale: 20MB par fichier' 
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        error: 'Trop de fichiers. Maximum 5 fichiers autorisés' 
      });
    }
    return res.status(400).json({ 
      error: err.message || 'Erreur lors de l\'upload du fichier' 
      });
  }
  next();
};

// Get details for all registered properties (propertyContent)
router.get('/registered-properties/details', async (req, res) => {
  try {
    // Get all propertyKeys from the collection
    const keysSnapshot = await (await import('../config/firebaseConfig.js')).db.collection('propertiesKeys').get();
    const registered = [];
    keysSnapshot.forEach(doc => {
      const data = doc.data();
      if (data && data.propId && data.propKey) {
        registered.push({ propId: data.propId, propKey: data.propKey });
      }
    });
    // Fetch property content for each
    const beds24Service = new (await import('../services/beds24Service.js')).Beds24Service();
    const details = [];
    for (const { propId, propKey } of registered) {
      try {
        const content = await beds24Service.getPropertyContent(propKey);
        details.push({ propId, propKey, content });
      } catch (err) {
        details.push({ propId, propKey, error: err.message });
      }
    }
    res.json({ details });
  } catch (error) {
    console.error('Error fetching registered property details:', error);
    res.status(500).json({ error: 'Failed to fetch registered property details' });
  }
});

// List all properties with a propertyKey (public)
router.get('/registered-properties', async (req, res) => {
  try {
    // Get all propertyKeys from the collection
    const keysSnapshot = await (await import('../config/firebaseConfig.js')).db.collection('propertiesKeys').get();
    const registered = [];
    keysSnapshot.forEach(doc => {
      const data = doc.data();
      if (data && data.propId && data.propKey) {
        registered.push({ propId: data.propId, propKey: data.propKey });
      }
    });
    res.json({ registered });
  } catch (error) {
    console.error('Error fetching registered properties:', error);
    res.status(500).json({ error: 'Failed to fetch registered properties' });
  }
});

/**
 * @swagger
 * /public/contact:
 *   post:
 *     summary: Send contact message
 *     tags: [Public]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jean Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jean.dupont@example.com"
 *               phone:
 *                 type: string
 *                 example: "06 12 34 56 78"
 *               subject:
 *                 type: string
 *                 example: "Demande de réservation"
 *               message:
 *                 type: string
 *                 example: "Je souhaiterais réserver le studio Albatros pour le weekend du 15-17 septembre."
 *               propertyInterest:
 *                 type: string
 *                 example: "Les studios de l'Albatros"
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 contactId:
 *                   type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export const sendContactMessage = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      subject, 
      title,
      message, 
      propertyInterest, 
      source 
    } = req.body;

    // Validation des champs requis
    if (!name || !email || !message) {
      // Si des fichiers ont été uploadés, les supprimer
      if (req.files) {
        cleanupFiles(req.files);
      }
      return res.status(400).json({ 
        error: 'Les champs nom, email et message sont requis' 
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (req.files) {
        cleanupFiles(req.files);
      }
      return res.status(400).json({ 
        error: 'Format d\'email invalide' 
      });
    }

    if (name.trim().length < 2) {
      if (req.files) {
        cleanupFiles(req.files);
      }
      return res.status(400).json({ 
        error: 'Le nom doit contenir au moins 2 caractères' 
      });
    }

    if (message.trim().length < 10) {
      if (req.files) {
        cleanupFiles(req.files);
      }
      return res.status(400).json({ 
        error: 'Le message doit contenir au moins 10 caractères' 
      });
    }

    const contactData = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      subject: subject || 'Contact depuis le site web',
      title: title?.trim() || '',
      message: message.trim(),
      propertyInterest: propertyInterest?.trim() || '',
      timestamp: new Date().toISOString(),
      source: source || 'website',
      status: 'new',
      userAgent: req.get('User-Agent') || 'Unknown',
      ip: req.ip || req.connection.remoteAddress,
      attachments: req.files || [] // Ajouter les fichiers uploadés
    };

    // Log du message reçu
    console.log('📧 Nouveau message de contact reçu:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👤 De: ${contactData.name} (${contactData.email})`);
    console.log(`📞 Téléphone: ${contactData.phone || 'Non renseigné'}`);
    console.log(`📋 Sujet: ${contactData.subject}`);
    console.log(`🏷️ Titre: ${contactData.title || 'Non renseigné'}`);
    console.log(`🏠 Propriété d'intérêt: ${contactData.propertyInterest || 'Aucune'}`);
    console.log(`📅 Reçu le: ${new Date(contactData.timestamp).toLocaleString('fr-FR')}`);
    if (contactData.attachments.length > 0) {
      console.log(`📎 Pièces jointes: ${contactData.attachments.length} fichier(s)`);
      contactData.attachments.forEach(file => {
        console.log(`   - ${file.originalname} (${(file.size / 1024).toFixed(2)} KB)`);
      });
    }
    console.log(`💬 Message:`);
    console.log(contactData.message);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Envoi des emails avec pièces jointes
    try {
      await emailService.sendContactNotification(contactData);
      console.log('✅ Emails de notification envoyés avec succès');
      
      // Nettoyer les fichiers temporaires après l'envoi de l'email
      cleanupFiles(contactData.attachments);
    } catch (emailError) {
      console.error('❌ Erreur lors de l\'envoi des emails:', emailError.message);
      // Nettoyer les fichiers même en cas d'erreur
      cleanupFiles(contactData.attachments);
      // On continue même si l'email échoue pour ne pas bloquer l'utilisateur
    }
    
    // TODO: Sauvegarder en base de données si nécessaire
    // await ContactMessage.create(contactData);

    res.json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous recontacterons dans les plus brefs délais.',
      contactId: contactData.id
    });

  } catch (error) {
    console.error('❌ Erreur lors du traitement du contact:', error);
    // Nettoyer les fichiers en cas d'erreur
    if (req.files) {
      cleanupFiles(req.files);
    }
    res.status(500).json({
      error: 'Une erreur interne s\'est produite. Veuillez réessayer.'
    });
  }
};

/**
 * @swagger
 * /public/testimonials:
 *   get:
 *     summary: Get all approved testimonials
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: List of approved testimonials
 */
export const getPublicTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.findApproved();
    res.json({
      success: true,
      count: testimonials.length,
      testimonials: testimonials.map(t => t.toJSON())
    });
  } catch (error) {
    console.error('Error fetching public testimonials:', error);
    next(error);
  }
};

/**
 * @swagger
 * /public/testimonials/top:
 *   get:
 *     summary: Get top rated testimonials
 *     tags: [Public]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *     responses:
 *       200:
 *         description: List of top rated testimonials
 */
export const getTopTestimonials = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const testimonials = await Testimonial.findTopRated(limit);
    res.json({
      success: true,
      count: testimonials.length,
      testimonials: testimonials.map(t => t.toJSON())
    });
  } catch (error) {
    console.error('Error fetching top testimonials:', error);
    next(error);
  }
};

/**
 * @swagger
 * /public/testimonials:
 *   post:
 *     summary: Submit a new testimonial
 *     tags: [Public]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *             required:
 *               - email
 *               - name
 *               - rating
 *               - comment
 *     responses:
 *       201:
 *         description: Testimonial submitted successfully
 */
export const createPublicTestimonial = async (req, res, next) => {
  try {
    const { email, name, rating, comment } = req.body;

    if (!email || !name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        error: 'Tous les champs sont obligatoires'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Format d\'email invalide'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'La note doit être entre 1 et 5'
      });
    }

    if (comment.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'L\'avis doit contenir au moins 10 caractères'
      });
    }

    const testimonial = await Testimonial.create({
      email,
      name,
      rating: parseInt(rating),
      comment
    });

    res.status(201).json({
      success: true,
      message: 'Votre témoignage a été envoyé avec succès. Il sera publié après modération.',
      testimonial: testimonial.toJSON()
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    next(error);
  }
};


export const testEmail = async (req, res) => {
  try {
    const { toEmail } = req.body;
    
    if (!toEmail) {
      return res.status(400).json({ error: 'Email de destination requis' });
    }

    const result = await emailService.sendTestEmail(toEmail);
    res.json({
      success: true,
      message: 'Email de test envoyé avec succès',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Erreur lors du test d\'email:', error);
    res.status(500).json({
      error: 'Erreur lors de l\'envoi de l\'email de test',
      details: error.message
    });
  }
}

export const emailStatus = async (req, res) => {
  try {
    const isValid = await emailService.testEmailConfiguration();
    res.json({
      emailConfigured: isValid,
      provider: process.env.EMAIL_PROVIDER || 'test',
      adminEmail: process.env.ADMIN_EMAIL || 'loire.et.nature.conciergerie@gmail.com'
    });
  } catch (error) {
    res.status(500).json({
      emailConfigured: false,
      error: error.message
    });
  }
}

// --- Real Beds24 Property Routes ---
router.get('/properties', async (req, res) => {
  try {
    const data = await beds24Service.getProperties();
    res.json(data);
  } catch (error) {
    console.error('Error fetching properties:', error.message);
    res.status(500).json({ error: 'Failed to fetch properties from Beds24' });
  }
});
router.get('/availability', async (req, res) => {
  try {
    const data = await beds24Service.getAvailabilities(req.query);
    res.json(data);
  } catch (error) {
    console.error('Error in getAvailabilities:', error.message);
    res.status(500).json({ error: error.message });
  }
});
router.get('/property/:propId', async (req, res) => {
  try {
    const { propId } = req.params;
    const { propKey } = req.query;
    const data = await beds24Service.getPropertyContent(propKey || propId);
    res.json(data);
  } catch (error) {
    console.error('Error in getPropertyContent:', error.message);
    res.status(500).json({ error: error.message });
  }
});
router.get('/testimonials', getPublicTestimonials);
router.get('/testimonials/top', getTopTestimonials);
router.post('/testimonials', createPublicTestimonial);
router.post('/contact', uploadMultiple, handleUploadError, sendContactMessage);
router.post('/test-email', testEmail);
router.get('/email-status', emailStatus);

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Public API is working',
    timestamp: new Date().toISOString(),
    endpoints: {
      properties: 'GET /api/public/properties',
      availability: 'GET /api/public/availability?propId=...',
      propertyContent: 'GET /api/public/property/:propId',
      contact: 'POST /api/public/contact'
    }
  });
});

export default router;