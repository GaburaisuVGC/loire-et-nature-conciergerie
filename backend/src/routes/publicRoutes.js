import { Router } from 'express';
import { Property } from '../models/Property.js';
import { Beds24Service } from '../services/beds24Service.js';

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
    // Pour l'instant, on retourne les données mockées
    // Plus tard, cela viendra de la base de données
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
    
    // Mock data complet - remplacer par Property.findById(id) plus tard
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

    // Mock des données de disponibilité
    const generateMockAvailability = () => {
      const availability = {};
      const startDate = start ? new Date(start) : new Date();
      const endDate = end ? new Date(end) : new Date(Date.now() + 120 * 24 * 60 * 60 * 1000);
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateKey = d.toISOString().split('T')[0];
        const isAvailable = Math.random() > 0.2; // 80% de chance d'être disponible
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
export const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, propertyInterest } = req.body;

    // Validation des champs requis
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Les champs nom, email et message sont requis' 
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Format d\'email invalide' 
      });
    }

    // Validation de la longueur des champs
    if (name.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Le nom doit contenir au moins 2 caractères' 
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ 
        error: 'Le message doit contenir au moins 10 caractères' 
      });
    }

    // Préparation des données du message
    const contactData = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      subject: subject || 'Contact depuis le site web',
      message: message.trim(),
      propertyInterest: propertyInterest?.trim() || '',
      timestamp: new Date().toISOString(),
      source: 'website',
      status: 'new',
      userAgent: req.get('User-Agent') || 'Unknown',
      ip: req.ip || req.connection.remoteAddress
    };

    // Log du message reçu
    console.log('📧 Nouveau message de contact reçu:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👤 De: ${contactData.name} (${contactData.email})`);
    console.log(`📞 Téléphone: ${contactData.phone || 'Non renseigné'}`);
    console.log(`📋 Sujet: ${contactData.subject}`);
    console.log(`🏠 Propriété d'intérêt: ${contactData.propertyInterest || 'Aucune'}`);
    console.log(`📅 Reçu le: ${new Date(contactData.timestamp).toLocaleString('fr-FR')}`);
    console.log(`💬 Message:`);
    console.log(contactData.message);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // TODO: Implémenter l'envoi d'email réel
    // Décommenter ces lignes quand le service email sera configuré
    /*
    try {
      const emailService = await import('../services/emailService.js');
      await emailService.default.sendContactNotification(contactData);
      console.log('✅ Emails de notification envoyés avec succès');
    } catch (emailError) {
      console.error('❌ Erreur lors de l\'envoi des emails:', emailError.message);
      // On continue même si l'email échoue
    }
    */
    
    // TODO: Sauvegarder en base de données
    // await ContactMessage.create(contactData);

    // Réponse de succès
    res.json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous recontacterons dans les plus brefs délais.',
      contactId: contactData.id,
      receivedAt: contactData.timestamp
    });

  } catch (error) {
    console.error('❌ Erreur lors du traitement du message de contact:', error);
    next(error);
  }
};

// Routes publiques
router.get('/properties', getPublicProperties);
router.get('/properties/:id', getPublicProperty);
router.get('/properties/:id/availability', getPropertyAvailability);
router.post('/contact', sendContactMessage);

// Route de test pour vérifier que l'API fonctionne
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