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

export const categories = [
  "Tous",
  "Antalgique",
  "Antibiotique",
  "Vitamines",
  "Anti-inflammatoire",
  "Voies Respiratoires",
  "Hygiène"
];
