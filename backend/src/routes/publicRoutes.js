import { Router } from 'express';
import { Property } from '../models/Property.js';
import { Testimonial } from '../models/Testimonial.js';
import { Beds24Service } from '../services/beds24Service.js';
import emailService from '../services/emailService.js';
import { uploadMultiple, cleanupFiles } from '../middlewares/uploadMiddleware.js';

const router = Router();
const beds24Service = new Beds24Service();

/**
 * @swagger
 * /public/properties:
 *   get:
 *     summary: Get all public properties
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: List of public properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */
export const getPublicProperties = async (req, res, next) => {
  try {
    const mockProperties = [
      {
        id: "1",
        name: "Les studios de l'Albatros",
        subtitle: "Les Maisons de Madeleine La Baule",
        fullName: "Les studios de l'Albatros - Les Maisons de Madeleine La Baule",
        description: "3 Studios indépendants avec vue jardin – Plage à 6 min à pied – Sans vis-à-vis\n\nSéjournez dans ce studio rénové niché au cœur d'un quartier résidentiel paisible, dans une maison sécurisée (sans ascenseur). Son atmosphère calme et lumineuse, associée à une vue dégagée sur jardin, vous offrira un véritable cocon de sérénité.\n\nÀ seulement 6 minutes à pied de la plage, vous pourrez savourer pleinement votre séjour, que ce soit pour des vacances, un week-end détente, ou un déplacement professionnel.\n\nParfait pour le télétravail : grâce à un espace bien aménagé et une connexion fiable, vous pourrez conjuguer productivité et qualité de vie.\n\nAccès facile aux transports en commun, permettant de découvrir les environs en toute liberté.\n\nSans vis-à-vis, calme absolu, ambiance cosy… Ce studio est une invitation à déconnecter tout en restant connecté.",
        address: "La Baule, Loire-Atlantique",
        suitableFor: ["tourisme", "voyage d'affaires"],
        coordinates: { lat: 47.2869, lng: -2.3910 },
        pricing: { basePrice: 61.80, currency: "EUR" },
        availability: "available",
        features: {
          surface: "14m²",
          maxGuests: 2,
          bedConfiguration: "1 lit double (140/190)"
        },
        images: [
          { id: 0, url: "/images/studio-albatros-1.jpg", alt: "Vue d'ensemble du studio" },
          { id: 12, url: "/images/studio-albatros-2.jpg", alt: "Coin couchage" }
        ]
      },
      {
        id: "2",
        name: "Kiwi",
        subtitle: "Les Maisons de Madeleine La Baule",
        fullName: "Kiwi - Les Maisons de Madeleine La Baule",
        description: "Charmant studio avec terrasse privée dans résidence calme. Idéal pour un séjour romantique ou professionnel en bord de mer.\n\nCe logement moderne et cosy vous séduira par sa décoration soignée et ses équipements de qualité. La terrasse offre un espace extérieur privatif pour profiter des beaux jours.\n\nSitué dans un quartier résidentiel paisible, vous bénéficierez d'un environnement calme tout en étant proche des commodités et de la plage.",
        address: "La Baule, Loire-Atlantique",
        suitableFor: ["tourisme", "voyage d'affaires"],
        coordinates: { lat: 47.2845, lng: -2.3890 },
        pricing: { basePrice: 75.50, currency: "EUR" },
        availability: "available",
        features: {
          surface: "18m²",
          maxGuests: 2,
          bedConfiguration: "1 lit double (140/190)"
        },
        images: [
          { id: 0, url: "/images/kiwi-1.jpg", alt: "Vue d'ensemble Kiwi" },
          { id: 12, url: "/images/kiwi-2.jpg", alt: "Terrasse privée" }
        ]
      },
      {
        id: "3",
        name: "Villa des Pins",
        subtitle: "Les Maisons de Madeleine La Baule",
        fullName: "Villa des Pins - Les Maisons de Madeleine La Baule",
        description: "Grande villa familiale avec jardin privatif, idéale pour les familles ou groupes d'amis. Proche de la plage et des commerces.\n\nCette villa spacieuse dispose de 3 chambres, d'un salon lumineux et d'un jardin clos parfait pour les enfants. Elle combine le confort moderne avec le charme de l'architecture balnéaire traditionnelle.\n\nParfaite pour des vacances en famille ou entre amis, avec de nombreux espaces de vie et une localisation privilégiée.",
        address: "La Baule, Loire-Atlantique",
        suitableFor: ["tourisme", "vacances familiales"],
        coordinates: { lat: 47.2820, lng: -2.3850 },
        pricing: { basePrice: 145.00, currency: "EUR" },
        availability: "available",
        features: {
          surface: "85m²",
          maxGuests: 6,
          bedConfiguration: "3 chambres (2 lits doubles, 2 lits simples)"
        },
        images: [
          { id: 0, url: "/images/villa-pins-1.jpg", alt: "Façade de la villa" },
          { id: 12, url: "/images/villa-pins-2.jpg", alt: "Salon principal" }
        ]
      }
    ];
    
    res.json(mockProperties);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /public/properties/{id}:
 *   get:
 *     summary: Get a public property by ID
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Public property found
 *       404:
 *         description: Property not found
 */
export const getPublicProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const mockProperties = {
      "1": {
        id: "1",
        name: "Les studios de l'Albatros",
        subtitle: "Les Maisons de Madeleine La Baule",
        fullName: "Les studios de l'Albatros - Les Maisons de Madeleine La Baule",
        beds24Id: "beds24_1",
        description: "3 Studios indépendants avec vue jardin – Plage à 6 min à pied – Sans vis-à-vis\n\nSéjournez dans ce studio rénové niché au cœur d'un quartier résidentiel paisible, dans une maison sécurisée (sans ascenseur). Son atmosphère calme et lumineuse, associée à une vue dégagée sur jardin, vous offrira un véritable cocon de sérénité.\n\nÀ seulement 6 minutes à pied de la plage, vous pourrez savourer pleinement votre séjour, que ce soit pour des vacances, un week-end détente, ou un déplacement professionnel.\n\nParfait pour le télétravail : grâce à un espace bien aménagé et une connexion fiable, vous pourrez conjuguer productivité et qualité de vie.\n\nAccès facile aux transports en commun, permettant de découvrir les environs en toute liberté.\n\nSans vis-à-vis, calme absolu, ambiance cosy… Ce studio est une invitation à déconnecter tout en restant connecté.",
        address: "La Baule, Loire-Atlantique",
        suitableFor: ["tourisme", "voyage d'affaires"],
        access: {
          beach: "200 m",
          shoppingCenter: "700 m",
          busStop: "50 m (U1, U3 et S/D)",
          trainStation: "4.5 km (Saint Nazaire)",
          saintMarc: "7.5 km (plage de Monsieur Hulot)",
          pornichet: "9 km"
        },
        features: {
          surface: "14m²",
          maxGuests: 2,
          bedConfiguration: "1 lit double (140/190)",
          amenities: [
            "Fonctionnel & lumineux",
            "Appartement dans maison sécurisée",
            "Salle de douche et WC",
            "Kitchenette toute équipée",
            "Linge de lit et serviettes fournis",
            "Lits préparés à l'arrivée",
            "Ménage professionnel",
            "Entrée autonome (boîte à clés sécurisée dès 16h)"
          ]
        },
        equipment: {
          "Sécurité": ["Extincteur d'incendie", "Détecteur de fumée"],
          "Salle de bain": ["Sèche-cheveux", "Shampooing", "Serviettes", "Articles de toilette"],
          "Chambre": ["Linge de maison", "Chaussons", "Cintres"],
          "Confort": ["Chauffage", "Internet/Wifi"],
          "Cuisine": ["Bouilloire", "Micro-ondes", "Cuisine équipée", "Machine à café", "Ustensiles"],
          "Business": ["Adapté pour un ordinateur portable"],
          "Emplacement": ["Vue sur la plage"],
          "Divertissement": ["TV"],
          "Pertinence": ["Location longue durée", "Enfants bienvenus", "Location non-fumeur"],
          "Règles": ["Animaux non admis"]
        },
        coordinates: { lat: 47.2869, lng: -2.3910 },
        pricing: { basePrice: 61.80, currency: "EUR" },
        images: [
          { id: 0, url: "/images/studio-albatros-1.jpg", alt: "Vue d'ensemble du studio" },
          { id: 12, url: "/images/studio-albatros-2.jpg", alt: "Coin couchage" },
          { id: 24, url: "/images/studio-albatros-3.jpg", alt: "Kitchenette équipée" },
          { id: 36, url: "/images/studio-albatros-4.jpg", alt: "Salle de douche" }
        ],
        availability: "available",
        status: "active"
      },
      "2": {
        id: "2",
        name: "Kiwi",
        subtitle: "Les Maisons de Madeleine La Baule",
        fullName: "Kiwi - Les Maisons de Madeleine La Baule",
        beds24Id: "beds24_2",
        description: "Charmant studio avec terrasse privée dans résidence calme. Idéal pour un séjour romantique ou professionnel en bord de mer.\n\nCe logement moderne et cosy vous séduira par sa décoration soignée et ses équipements de qualité. La terrasse offre un espace extérieur privatif pour profiter des beaux jours.\n\nSitué dans un quartier résidentiel paisible, vous bénéficierez d'un environnement calme tout en étant proche des commodités et de la plage.",
        address: "La Baule, Loire-Atlantique",
        suitableFor: ["tourisme", "voyage d'affaires"],
        access: {
          beach: "300 m",
          shoppingCenter: "500 m",
          busStop: "100 m",
          trainStation: "5 km (Saint Nazaire)",
          saintMarc: "8 km",
          pornichet: "10 km"
        },
        features: {
          surface: "18m²",
          maxGuests: 2,
          bedConfiguration: "1 lit double (140/190)",
          amenities: [
            "Studio moderne avec terrasse",
            "Décoration soignée",
            "Terrasse privée",
            "Quartier calme",
            "Parking privé",
            "Linge fourni",
            "Ménage inclus"
          ]
        },
        equipment: {
          "Sécurité": ["Extincteur d'incendie", "Détecteur de fumée"],
          "Salle de bain": ["Sèche-cheveux", "Shampooing", "Serviettes", "Articles de toilette"],
          "Chambre": ["Linge de maison", "Chaussons", "Cintres"],
          "Confort": ["Chauffage", "Internet/Wifi", "Climatisation"],
          "Cuisine": ["Bouilloire", "Micro-ondes", "Cuisine équipée", "Machine à café", "Ustensiles", "Réfrigérateur"],
          "Business": ["Adapté pour un ordinateur portable", "Bureau"],
          "Extérieur": ["Terrasse privée", "Mobilier de jardin"],
          "Divertissement": ["TV", "Netflix"],
          "Pertinence": ["Location longue durée", "Enfants bienvenus", "Location non-fumeur"],
          "Règles": ["Animaux non admis"]
        },
        coordinates: { lat: 47.2845, lng: -2.3890 },
        pricing: { basePrice: 75.50, currency: "EUR" },
        images: [
          { id: 0, url: "/images/kiwi-1.jpg", alt: "Vue d'ensemble Kiwi" },
          { id: 12, url: "/images/kiwi-2.jpg", alt: "Terrasse privée" },
          { id: 24, url: "/images/kiwi-3.jpg", alt: "Coin salon" },
          { id: 36, url: "/images/kiwi-4.jpg", alt: "Salle de bain moderne" }
        ],
        availability: "available",
        status: "active"
      },
      "3": {
        id: "3",
        name: "Villa des Pins",
        subtitle: "Les Maisons de Madeleine La Baule",
        fullName: "Villa des Pins - Les Maisons de Madeleine La Baule",
        beds24Id: "beds24_3",
        description: "Grande villa familiale avec jardin privatif, idéale pour les familles ou groupes d'amis. Proche de la plage et des commerces.\n\nCette villa spacieuse dispose de 3 chambres, d'un salon lumineux et d'un jardin clos parfait pour les enfants. Elle combine le confort moderne avec le charme de l'architecture balnéaire traditionnelle.\n\nParfaite pour des vacances en famille ou entre amis, avec de nombreux espaces de vie et une localisation privilégiée.",
        address: "La Baule, Loire-Atlantique",
        suitableFor: ["tourisme", "vacances familiales"],
        access: {
          beach: "400 m",
          shoppingCenter: "600 m",
          busStop: "150 m",
          trainStation: "6 km (Saint Nazaire)",
          saintMarc: "9 km",
          pornichet: "8 km"
        },
        features: {
          surface: "85m²",
          maxGuests: 6,
          bedConfiguration: "3 chambres (2 lits doubles, 2 lits simples)",
          amenities: [
            "Villa individuelle",
            "Jardin privatif clos",
            "3 chambres",
            "Salon spacieux",
            "Cuisine équipée",
            "2 salles de bain",
            "Parking privé",
            "Barbecue"
          ]
        },
        equipment: {
          "Sécurité": ["Extincteur d'incendie", "Détecteur de fumée", "Portail sécurisé"],
          "Salle de bain": ["2 Sèche-cheveux", "Shampooing", "Serviettes", "Articles de toilette"],
          "Chambre": ["Linge de maison", "Cintres", "Placards"],
          "Confort": ["Chauffage", "Internet/Wifi"],
          "Cuisine": ["Lave-vaisselle", "Four", "Micro-ondes", "Cuisine équipée", "Machine à café", "Ustensiles complets"],
          "Business": ["Adapté pour un ordinateur portable", "Espace bureau"],
          "Extérieur": ["Jardin privatif", "Barbecue", "Mobilier de jardin", "Transats"],
          "Divertissement": ["TV", "Netflix", "Jeux pour enfants"],
          "Pertinence": ["Location longue durée", "Enfants bienvenus", "Location non-fumeur"],
          "Règles": ["Animaux non admis"]
        },
        coordinates: { lat: 47.2820, lng: -2.3850 },
        pricing: { basePrice: 145.00, currency: "EUR" },
        images: [
          { id: 0, url: "/images/villa-pins-1.jpg", alt: "Façade de la villa" },
          { id: 12, url: "/images/villa-pins-2.jpg", alt: "Salon principal" },
          { id: 24, url: "/images/villa-pins-3.jpg", alt: "Jardin privatif" },
          { id: 36, url: "/images/villa-pins-4.jpg", alt: "Cuisine équipée" }
        ],
        availability: "available",
        status: "active"
      }
    };
    
    const property = mockProperties[id];
    if (!property) {
      return res.status(404).json({ error: 'Propriété non trouvée' });
    }
    
    res.json(property);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /public/properties/{id}/availability:
 *   get:
 *     summary: Get property availability
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Availability data
 */
export const getPropertyAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { start, end } = req.query;

    const generateMockAvailability = () => {
      const availability = {};
      const startDate = start ? new Date(start) : new Date();
      const endDate = end ? new Date(end) : new Date(Date.now() + 120 * 24 * 60 * 60 * 1000);
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateKey = d.toISOString().split('T')[0];
        const isAvailable = Math.random() > 0.2;
        const basePrice = 61.80;
        const priceVariation = (Math.random() - 0.5) * 20;
        
        availability[dateKey] = {
          available: isAvailable,
          price: isAvailable ? Number((basePrice + priceVariation).toFixed(2)) : null,
          minStay: isAvailable ? Math.floor(Math.random() * 3) + 1 : null,
          maxStay: isAvailable ? Math.floor(Math.random() * 7) + 3 : null
        };
      }
      
      return availability;
    };

    res.json({
      propertyId: id,
      period: { start: start || new Date().toISOString().split('T')[0], end },
      availability: generateMockAvailability(),
      lastUpdated: new Date().toISOString(),
      source: 'mock'
    });
  } catch (error) {
    next(error);
  }
};

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

router.get('/properties', getPublicProperties);
router.get('/properties/:id', getPublicProperty);
router.get('/properties/:id/availability', getPropertyAvailability);
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
      property: 'GET /api/public/properties/:id',
      availability: 'GET /api/public/properties/:id/availability',
      contact: 'POST /api/public/contact'
    }
  });
});

export default router;