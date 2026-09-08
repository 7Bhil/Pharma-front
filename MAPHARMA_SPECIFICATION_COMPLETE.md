# 📚 PharmaConnect / MaPharma — Spécification Frontend Exclusive (React 18 SPA)

> **Document de Référence Frontend Développeur**  
> **Périmètre strict :** 100% Client React (Vite)  
> **Date de mise à jour :** 8 Septembre 2026  
> **Stack UI :** React 18 SPA (Vite) + React Router v6 + Zustand + Axios + CSS Design System  
> **Règle UI :** Zéro émoji dans les interfaces métier, icônes vectorielles SVG professionnelles uniquement.

---

## 1. 🎯 Périmètre & Objectif Frontend

Ce document cadre exclusivement le développement du **Frontend React SPA**.  
Le backend (Laravel API) est considéré comme une boîte noire fournissant des points d'accès REST et des webhooks.

### Le Rôle du Frontend :
Offrir une expérience fluide et rassurante aux **Patients / Clients** pour :
1. **Trouver immédiatement un médicament** ou une pharmacie de garde.
2. **Télétransmettre une ordonnance** (photo/PDF) en 2 clics.
3. **Réserver son panier et payer en ligne** (intégration redirection/modal SASPay).
4. **Gérer son espace personnel (`/dashboard`)** avec son **Pass Retrait (QR Code + Code SMS 6 chiffres)**.

---

## 2. 🗺️ Arborescence des Pages & Routes Frontend

```
/ (Landing Page & Recherche Express)
│
├── /login (Connexion Patient par Téléphone/Email)
├── /register (Inscription Patient sans émojis avec jauge de mot de passe)
│
├── /medicines (Catalogue & Disponibilité des stocks en direct)
├── /pharmacies (Carte géolocalisée & Pharmacies de garde)
├── /cart (Panier, récapitulatif & choix de l'officine de retrait)
├── /checkout/payment (Paiement SASPay & Redirection succès/échec)
│
└── /dashboard (Espace Personnel Patient)
    ├── /dashboard/orders (Suivi des réservations en cours & Pass Retrait QR/SMS)
    ├── /dashboard/prescriptions (Dépôt & historique des ordonnances)
    ├── /dashboard/pharmacies (Mes pharmacies favorites & de proximité)
    └── /dashboard/profile (Gestion coordonnées, téléphone pour les SMS)
```

---

## 3. 🧩 Composants Frontend Clés à Développer

### 3.1 Espace Patient (`/dashboard`)
- **`DashboardLayout`** : Navigation latérale (Sidebar) responsive avec onglets :
  - *Vue d'ensemble / Résumé*
  - *Mes Retraits & Commandes*
  - *Mes Ordonnances*
  - *Pharmacies Favorites*
  - *Paramètres & Sécurité*
- **`OrderTrackerCard`** : Carte visuelle avec barre de progression de la commande :
  - Étapes : `Confirmée` ➔ `En préparation` ➔ `Prête pour retrait` ➔ `Retirée`.
- **`PickupPassModal / Card`** : Le Pass Retrait officiel :
  - Affichage d'un **QR Code** SVG interactif.
  - Affichage en grand du **code de retrait à 6 chiffres** (ex: `482 910`) avec bouton "Copier".
  - Adresse et itinéraire vers la pharmacie choisie.
- **`PrescriptionUploadDropzone`** : Zone de glisser-déposer pour ordonnances avec prévisualisation du document, sélection de l'officine destinataire et champ de note optionnel.

### 3.2 Catalogue & Recherche Médicaments
- **`SearchBar`** : Recherche instantanée par nom commercial, DCI et catégorie.
- **`StockBadge`** : Badge de disponibilité dynamique (`En stock`, `Stock limité`, `Rupture`).
- **`MedicineCard`** : Fiche produit avec posologie synthétique, prix en F CFA, et bouton "Ajouter au panier".

### 3.3 Cartographie & Garde
- **`PharmacyMap`** : Intégration carte (Leaflet / OpenStreetMap) avec repères des officines de garde 24h/24 et calcul de la distance estimée.

---

## 4. 🗄️ Gestion de l'État Global (Zustand Stores)

Pour découpler l'interface et gérer le parcours sans rechargement de page :

1. **`authStore.js`** :
   - État utilisateur connecté (`user`, `token`, `isAuthenticated`).
   - Méthodes : `login(credentials)`, `logout()`, `updateProfile()`.
   - Persistance locale du jeton (`localStorage`).

2. **`cartStore.js`** :
   - Panier d'achat : `items[]`, `selectedPharmacy`, `totalAmount`.
   - Méthodes : `addItem()`, `removeItem()`, `setPharmacy()`, `clearCart()`.
   - Persistance locale automatique (`zustand/middleware persist`).

3. **`prescriptionStore.js`** :
   - État temporaire de l'ordonnance en cours d'envoi avant validation.

---

## 5. 🔌 Contrat d'Interface API (Consommation REST)

Le frontend consomme les endpoints suivants exposés par le backend :

| Méthode | Endpoint API | Rôle dans l'UI |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Inscription du patient |
| `POST` | `/api/auth/login` | Authentification & réception du Bearer Token |
| `GET` | `/api/auth/me` | Récupération du profil connecté |
| `GET` | `/api/medicines` | Liste & recherche des médicaments avec filtres |
| `GET` | `/api/pharmacies?lat=...&lng=...` | Officines à proximité & statut de garde |
| `POST` | `/api/prescriptions` | Envoi d'une ordonnance (FormData multipart) |
| `GET` | `/api/user/reservations` | Récupération des commandes du patient pour le dashboard |
| `POST` | `/api/reservations` | Création d'une commande / session SASPay |

---

## 6. 🎨 Charte Graphique & Tokens UI (Frontend)

- **Palette Santé :**
  - Vert Émeraude Principal : `#059669` (hover: `#047857`, fond subtil: `#ecfdf5`)
  - Bleu Médical Secondaire : `#0284c7`
  - Fond de page neutre : `#f8fafc`
  - Textes : `#0f172a` (titres), `#64748b` (secondaire)
- **Icônes :** SVG inline uniquement (Lucide / Custom SVG), zéro émoji dans l'application.
- **Responsive :** Optimisé en priorité pour mobile (usage majoritaire des patients en déplacement).

---

## 7. 🛡️ Règles Git & CI/CD Frontend

- **Branche `main` protégée** : Tout le travail frontend est développé sur des branches dédiées (`feature/...`).
- **Pipeline GitHub Actions (`.github/workflows/ci.yml`)** :
  - Exécute `npm run lint` (`eslint`)
  - Exécute `npm run build` (`vite build`)
  - Bloque toute PR ne compilant pas à 100%.
