/**
 * PharmaConnect - Données factices structurées (Mock Data)
 * Conçu pour correspondre aux futures réponses API REST / JSON du backend Laravel.
 */

// Liste des médicaments en catalogue
export const mockMedicines = [
  {
    id: 1,
    name: "Paracétamol Pro 1g",
    scientificName: "Paracétamol",
    description: "Soulage les douleurs d'intensité légère à modérée et les états fébriles. Boîte de 8 comprimés sécables.",
    price: 1500,
    category: "Antalgique",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Amoxicilline 500mg",
    scientificName: "Amoxicilline trihydratée",
    description: "Antibiotique de référence de la famille des pénicillines. Traitement des infections bactériennes courantes.",
    price: 3200,
    category: "Antibiotique",
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Vitamine C 1000mg Énergie",
    scientificName: "Acide ascorbique",
    description: "Booste le métabolisme énergétique et le système immunitaire. Comprimés effervescents arôme orange.",
    price: 2800,
    category: "Vitamines",
    stock: 100,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Ibuprofène Flash 400mg",
    scientificName: "Ibuprofène",
    description: "Anti-inflammatoire non stéroïdien (AINS). Efficace rapidement contre les céphalées, courbatures et rages de dents.",
    price: 2200,
    category: "Anti-inflammatoire",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Sirop Toux Sèche Pectoral",
    scientificName: "Dextrométhorphane",
    description: "Apaise rapidement les quintes de toux sèches et d'irritation, facilitant un sommeil réparateur.",
    price: 3500,
    category: "Voies Respiratoires",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Solution Hydroalcoolique 500ml",
    scientificName: "Éthanol 70% v/v",
    description: "Désinfection hygiénique et chirurgicale des mains par friction. Norme hospitalière bactéricide et virucide.",
    price: 1800,
    category: "Hygiène",
    stock: 200,
    imageUrl: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=700&q=80"
  }
];

// Catégories de médicaments disponibles
export const categories = [
  "Tous",
  "Antalgique",
  "Antibiotique",
  "Vitamines",
  "Anti-inflammatoire",
  "Voies Respiratoires",
  "Hygiène"
];

// Pharmacies partenaires / de garde pour le simulateur et le sélecteur
export const mockPharmacies = [
  {
    id: 1,
    name: "Pharmacie Centrale du Plateau",
    address: "Boulevard de la République",
    distance: "À 450m",
    statusText: "Ouverte jusqu'à 22h00",
    isGuard: true
  },
  {
    id: 2,
    name: "Pharmacie de la Corniche",
    address: "Avenue Jean Jaurès",
    distance: "À 850m",
    statusText: "Ouverte 24h/24",
    isGuard: true
  },
  {
    id: 3,
    name: "Pharmacie des Jardins",
    address: "Rue des Écoles",
    distance: "À 1.2km",
    statusText: "Ouverte jusqu'à 20h00",
    isGuard: false
  }
];

// Médicaments en démonstration dans le widget Hero
export const mockHeroLiveItems = [
  {
    id: 1,
    title: "Amoxicilline 500mg",
    detail: "3 200 F CFA • Boîte de 12 gélules",
    stockCount: 20,
    statusBadge: "20 boîtes disp.",
    statusType: "in_stock"
  },
  {
    id: 2,
    title: "Paracétamol Pro 1g",
    detail: "1 500 F CFA • Boîte de 8 comprimés",
    stockCount: 50,
    statusBadge: "50 boîtes disp.",
    statusType: "in_stock"
  },
  {
    id: 3,
    title: "Sirop Toux Sèche Pectoral",
    detail: "3 500 F CFA • Flacon 150ml",
    stockCount: 4,
    statusBadge: "Stock limité (4)",
    statusType: "low_stock"
  }
];

// Métriques d'impact de la plateforme
export const mockPlatformMetrics = [
  {
    id: "reliability",
    value: "99.4%",
    label: "Fiabilité des stocks déclarés"
  },
  {
    id: "time",
    value: "< 20 min",
    label: "Délai moyen de préparation ordonnance"
  },
  {
    id: "pharmacies",
    value: "1 420+",
    label: "Officines de garde & partenaires"
  },
  {
    id: "orders",
    value: "180k+",
    label: "Traitements sécurisés ce mois-ci"
  }
];

