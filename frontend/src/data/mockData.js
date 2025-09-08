export const mockProperties = [
  {
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
    coordinates: {
      lat: 47.2869,
      lng: -2.3910
    },
    images: [
      { id: 0, url: "/images/studio-albatros-1.jpg", alt: "Vue d'ensemble du studio" },
      { id: 12, url: "/images/studio-albatros-2.jpg", alt: "Coin couchage" },
      { id: 24, url: "/images/studio-albatros-3.jpg", alt: "Kitchenette équipée" },
      { id: 36, url: "/images/studio-albatros-4.jpg", alt: "Salle de douche" }
    ],
    pricing: {
      basePrice: 61.80,
      currency: "EUR"
    },
    availability: "available",
    status: "active"
  },
  {
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
    coordinates: {
      lat: 47.2845,
      lng: -2.3890
    },
    images: [
      { id: 0, url: "/images/kiwi-1.jpg", alt: "Vue d'ensemble Kiwi" },
      { id: 12, url: "/images/kiwi-2.jpg", alt: "Terrasse privée" },
      { id: 24, url: "/images/kiwi-3.jpg", alt: "Coin salon" },
      { id: 36, url: "/images/kiwi-4.jpg", alt: "Salle de bain moderne" }
    ],
    pricing: {
      basePrice: 75.50,
      currency: "EUR"
    },
    availability: "available",
    status: "active"
  },
  {
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
    coordinates: {
      lat: 47.2820,
      lng: -2.3850
    },
    images: [
      { id: 0, url: "/images/villa-pins-1.jpg", alt: "Façade de la villa" },
      { id: 12, url: "/images/villa-pins-2.jpg", alt: "Salon principal" },
      { id: 24, url: "/images/villa-pins-3.jpg", alt: "Jardin privatif" },
      { id: 36, url: "/images/villa-pins-4.jpg", alt: "Cuisine équipée" }
    ],
    pricing: {
      basePrice: 145.00,
      currency: "EUR"
    },
    availability: "available",
    status: "active"
  }
];

// Mock du calendrier de disponibilités
export const generateMockCalendarData = (startDate = new Date()) => {
  const availabilityData = {};
  const startMonth = new Date(startDate);
  
  // Générer 4 mois de données
  for (let monthOffset = 0; monthOffset < 4; monthOffset++) {
    const currentMonth = new Date(startMonth.getFullYear(), startMonth.getMonth() + monthOffset, 1);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Nombre de jours dans le mois
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Simulation aléatoire de disponibilité (80% de chance d'être disponible)
      const isAvailable = Math.random() > 0.2;
      const basePrice = 61.80;
      const priceVariation = (Math.random() - 0.5) * 20; // Variation de ±10€
      
      availabilityData[dateKey] = {
        available: isAvailable,
        price: isAvailable ? Number((basePrice + priceVariation).toFixed(2)) : null,
        minStay: isAvailable ? Math.floor(Math.random() * 3) + 1 : null,
        maxStay: isAvailable ? Math.floor(Math.random() * 7) + 3 : null
      };
    }
  }
  
  return availabilityData;
};

// Mock des équipements pour filtrages
export const mockAmenities = [
  { id: "wifi", name: "WiFi", category: "Confort" },
  { id: "parking", name: "Parking", category: "Commodités" },
  { id: "kitchen", name: "Cuisine équipée", category: "Cuisine" },
  { id: "tv", name: "TV", category: "Divertissement" },
  { id: "garden", name: "Jardin", category: "Extérieur" },
  { id: "terrace", name: "Terrasse", category: "Extérieur" },
  { id: "beach_view", name: "Vue sur plage", category: "Emplacement" },
  { id: "business", name: "Adapté télétravail", category: "Business" },
  { id: "family_friendly", name: "Enfants bienvenus", category: "Pertinence" },
  { id: "non_smoking", name: "Non fumeur", category: "Règles" }
];

export default {
  mockProperties,
  generateMockCalendarData,
  mockAmenities
};