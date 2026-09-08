// Données simulées pour l'espace patient MaPharma / PharmaConnect

export const mockCurrentUser = {
  id: 'usr_9921',
  firstname: 'Jean',
  lastname: 'Dupont',
  email: 'jean.dupont@email.com',
  phone: '+229 97 00 12 34',
  city: 'Cotonou',
  bloodGroup: 'O+',
  allergies: ['Pénicilline'],
  registeredAt: '2026-02-15',
};

export const mockReservations = [
  {
    id: 'RES-8921',
    createdAt: '2026-09-08 09:30',
    pharmacy: {
      name: 'Pharmacie Centrale du Plateau',
      address: 'Avenue Jean-Paul II, Cotonou',
      phone: '+229 21 31 00 22',
      openingHours: 'Ouverte 24h/24 (De garde)',
      distance: '450 m',
    },
    status: 'READY_FOR_PICKUP', // 'PENDING_PREPARATION' | 'IN_PREPARATION' | 'READY_FOR_PICKUP' | 'COMPLETED'
    pickupCode: '482 910',
    totalAmount: 6700,
    items: [
      { id: 1, name: 'Paracétamol Pro 1g', quantity: 2, price: 1500 },
      { id: 2, name: 'Sirop Toux Sèche Pectoral', quantity: 1, price: 3700 },
    ],
    hasPrescription: false,
    estimatedReadyTime: 'Prête depuis 10 min',
  },
  {
    id: 'RES-8410',
    createdAt: '2026-09-05 14:15',
    pharmacy: {
      name: 'Pharmacie de la Haie Vive',
      address: 'Rue 340, Haie Vive, Cotonou',
      phone: '+229 21 30 15 88',
      openingHours: 'Fermée à 21h00',
      distance: '1.2 km',
    },
    status: 'COMPLETED',
    pickupCode: '109 342',
    totalAmount: 14200,
    items: [
      { id: 3, name: 'Amoxicilline 500mg', quantity: 2, price: 3200 },
      { id: 4, name: 'Vitamine C Acérola 1000mg', quantity: 2, price: 3900 },
    ],
    hasPrescription: true,
    completedAt: '2026-09-05 16:40',
  },
];

export const mockUserPrescriptions = [
  {
    id: 'ORD-2026-004',
    uploadedAt: '2026-09-07 18:20',
    pharmacyName: 'Pharmacie Centrale du Plateau',
    doctor: 'Dr. Mensah (Cabinet Saint-Luc)',
    status: 'VALIDATED', // 'PENDING_REVIEW' | 'VALIDATED' | 'REJECTED'
    documentName: 'ordonnance_septembre_2026.pdf',
    fileSize: '1.4 Mo',
    notes: 'Traitement antibio pour 7 jours + contrôle température',
  },
  {
    id: 'ORD-2026-001',
    uploadedAt: '2026-08-14 10:05',
    pharmacyName: 'Pharmacie de la Haie Vive',
    doctor: 'Dr. Lawson (Pédiatrie)',
    status: 'COMPLETED',
    documentName: 'ordonnance_soins_aout.jpg',
    fileSize: '2.8 Mo',
    notes: 'Délivrance effectuée',
  },
];

export const mockFavoritePharmacies = [
  {
    id: 1,
    name: 'Pharmacie Centrale du Plateau',
    address: 'Avenue Jean-Paul II, Cotonou',
    phone: '+229 21 31 00 22',
    isDuty: true,
    distance: '450 m',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Pharmacie de la Haie Vive',
    address: 'Rue 340, Haie Vive, Cotonou',
    phone: '+229 21 30 15 88',
    isDuty: false,
    distance: '1.2 km',
    rating: 4.7,
  },
];
