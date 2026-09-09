import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import MedicineCard from "./components/MedicineCard";
import MedicineDetailModal from "./components/MedicineDetailModal";
import CartDrawer from "./components/CartDrawer";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import { 
  mockMedicines, 
  categories, 
  mockPharmacies, 
  mockHeroLiveItems, 
  mockPlatformMetrics 
} from "./data/mockData";

const LandingPage = ({ onOpenCart, cartCount, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [activeTab, setActiveTab] = useState("patient");
  const [prescriptionSent, setPrescriptionSent] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedMedicineDetail, setSelectedMedicineDetail] = useState(null);

  // Filtering medicines
  const filteredMedicines = useMemo(() => {
    return mockMedicines.filter((med) => {
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            med.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            med.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === "Tous" || med.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handlePrescriptionSim = (e) => {
    e.preventDefault();
    if (!fileName) return;
    setPrescriptionSent(true);
    setTimeout(() => {
      setPrescriptionSent(false);
      setFileName("");
    }, 6000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar cartCount={cartCount} onOpenCart={onOpenCart} />

      <main className="flex-grow">
        {/* HERO SECTION - 100vh Full Screen */}
        <section className="relative min-h-[calc(100vh-68px)] flex items-center py-12 lg:py-16 bg-gradient-to-b from-emerald-50/70 via-slate-50/60 to-slate-50 border-b border-slate-200/80 overflow-hidden">
          {/* Subtle geometric dot grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Value Proposition & Hero Search */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider w-max mb-6 border border-emerald-200/60 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  <span>Réseau Officinal National Connecté</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-heading tracking-tight text-slate-900 leading-[1.15] mb-5">
                  Trouvez vos traitements, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">évitez les ruptures</span> et réservez en direct.
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
                  PharmaConnect synchronise l inventaire des officines partenaires en direct. 
                  Consultez la disponibilité immédiate de vos médicaments, bloquez votre boîte pour un retrait coupe-file ou télétransmettez votre ordonnance.
                </p>

                {/* Quick Search Bar directly in Hero */}
                <div className="flex flex-col sm:flex-row gap-2.5 bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-300 shadow-xl shadow-slate-200/50 max-w-xl mb-6">
                  <div className="flex items-center flex-grow px-3 gap-2.5">
                    <svg className="text-slate-400 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Ex: Paracétamol, Doliprane, Amoxicilline, Vitamine C..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none text-slate-900 text-sm sm:text-base placeholder-slate-400 focus:outline-hidden"
                    />
                    {searchQuery && (
                      <button 
                        type="button" 
                        onClick={() => setSearchQuery("")} 
                        className="text-slate-400 hover:text-slate-600 text-xs p-1 rounded-full hover:bg-slate-100"
                        aria-label="Effacer la saisie"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <a 
                    href="#search-section" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all shrink-0"
                  >
                    Rechercher
                  </a>
                </div>

                {/* Professional Health Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                    <span>Données de santé protégées</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>Mise à jour toutes les 15 min</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>+1 400 officines partenaires</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Interactive Hero Card / Pharmacy Status */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl shadow-slate-300/40 border border-slate-200/90 relative">
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 21h18M5 21V7l8-4 6 4v14M12 11v6M9 14h6" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">Pharmacie Centrale du Plateau</div>
                        <div className="text-xs text-slate-500 font-medium">À 450m • Ouverte jusqu à 22h00</div>
                      </div>
                    </div>
                    <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
                      Direct
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {mockHeroLiveItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</div>
                          <div className="text-[11px] text-slate-500">{item.detail}</div>
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          item.statusType === "low_stock" 
                            ? "bg-amber-100 text-amber-800 border border-amber-200" 
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}>
                          {item.statusBadge}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50/80 border border-dashed border-slate-300 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-slate-600 text-center sm:text-left">
                      <strong className="text-slate-900 font-semibold block">Préparation express :</strong>
                      Votre ordonnance prête en moins de 30 min sans faire la queue.
                    </div>
                    <Link 
                      to="/register" 
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shrink-0"
                    >
                      Créer mon pass
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS STRIP */}
        <section className="bg-white border-b border-slate-200/80 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {mockPlatformMetrics.map((metric, idx) => (
                <div key={metric.id} className={`flex flex-col items-center justify-center ${idx < mockPlatformMetrics.length - 1 ? "lg:border-r lg:border-slate-200/80" : ""}`}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-emerald-700 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE INVENTORY EXPLORER */}
        <section className="py-16 sm:py-20 bg-slate-50" id="search-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Disponibilité Officinale</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                  Consultez les stocks disponibles en direct
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
                  Recherchez par dénomination commune internationale (DCI), nom commercial ou pathologie.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Serveur d officines synchronisé</span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Medicines Grid */}
            {filteredMedicines.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMedicines.map((med) => (
                  <MedicineCard 
                    key={med.id} 
                    medicine={med} 
                    onOpenDetail={(item) => setSelectedMedicineDetail(item)}
                    onQuickReserve={(item) => onAddToCart(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Aucun produit ne correspond</h3>
                <p className="text-xs text-slate-500 mb-5">Essayez un autre terme ou réinitialisez les filtres.</p>
                <button 
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors" 
                  onClick={() => { setSearchQuery(""); setSelectedCategory("Tous"); }}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ORDONNANCE & HOW IT WORKS */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Parcours simplifié</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                Comment fonctionne PharmaConnect ?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Un circuit de santé fluide, du cabinet médical jusqu’à la délivrance sécurisée de votre traitement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 relative">
                <div className="text-4xl font-extrabold font-heading text-slate-200 mb-4">01</div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Vérification des stocks</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Consultez en 1 clic si le traitement prescrit est bien disponible dans l une des officines à proximité.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-8 border-2 border-emerald-300 relative shadow-lg shadow-emerald-500/5">
                <div className="text-4xl font-extrabold font-heading text-emerald-200 mb-4">02</div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-md shadow-emerald-600/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Télétransmission chiffrée</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Photographiez ou importez votre ordonnance. Elle est transmise sous protocole sécurisé à votre pharmacien.
                </p>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 relative">
                <div className="text-4xl font-extrabold font-heading text-slate-200 mb-4">03</div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Retrait coupe-file ou livraison</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Recevez une notification dès que votre commande est prête. Passez au comptoir prioritaire sans patienter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRESCRIPTION UPLOAD INTERACTIVE FEATURE */}
        <section className="py-16 sm:py-20 bg-slate-50" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Service Sécurisé
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  Déposez votre ordonnance en toute tranquillité
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Gagnez du temps pour vos renouvellements ou ordonnances urgentes. Votre pharmacien valide les posologies 
                  et prépare votre sachet nominatif avant même votre arrivée.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>Chiffrement de vos documents médicaux</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>Vérification systématique des interactions médicamenteuses</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>Gratuit et sans engagement</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200">
                  <form onSubmit={handlePrescriptionSim} className="space-y-5">
                    <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-50/50 transition-colors flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </div>
                      <div className="text-sm font-bold text-slate-900 mb-0.5">Glissez votre ordonnance ici</div>
                      <span className="text-xs text-slate-500 mb-4">ou sélectionnez un fichier (PDF, JPG, PNG)</span>
                      
                      <input 
                        type="file" 
                        id="prescription-file" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFileName(e.target.files[0].name);
                          }
                        }}
                      />
                      <label 
                        htmlFor="prescription-file" 
                        className="cursor-pointer px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                      >
                        {fileName ? `Fichier : ${fileName}` : "Parcourir mes documents"}
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Pharmacie de retrait souhaitée
                      </label>
                      <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-emerald-600">
                        {mockPharmacies.map((pharmacy) => (
                          <option key={pharmacy.id} value={pharmacy.id}>
                            {pharmacy.name} ({pharmacy.distance}) - {pharmacy.statusText}
                          </option>
                        ))}
                      </select>
                    </div>

                    {prescriptionSent ? (
                      <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3 text-emerald-800 text-xs sm:text-sm font-semibold">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-emerald-600">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>Ordonnance transmise avec succès ! L équipe prépare votre commande.</span>
                      </div>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={!fileName}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20"
                      >
                        Transmettre pour préparation immédiate
                      </button>
                    )}
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SOLUTIONS SECTION */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80" id="pharmacies">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">Écosystème Global</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                Une solution pensée pour tout l écosystème
              </h2>
            </div>

            <div className="flex justify-center gap-2 mb-10">
              <button 
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "patient" 
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                onClick={() => setActiveTab("patient")}
              >
                Pour les Patients
              </button>
              <button 
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "pharmacy" 
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                onClick={() => setActiveTab("pharmacy")}
              >
                Pour les Professionnels & Officines
              </button>
            </div>

            <div>
              {activeTab === "patient" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Zéro déplacement inutile</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Ne courez plus d une officine à l autre en cas de rupture de stock.</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Dossier Sécurisé</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Conservez l historique de vos ordonnances et posologies au même endroit.</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Rappels de Renouvellement</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Soyez notifié quelques jours avant la fin de votre boîte pour anticiper.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                      </svg>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Dégorgement des files d attente</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Préparez les commandes pendant les heures calmes avec comptoir prioritaire.</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                      </svg>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Synchronisation LGO & ERP</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Intégration directe avec vos logiciels officinaux sans double saisie.</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Valorisation du conseil</h4>
                    <p className="text-xs sm:text-sm text-slate-600">Passez plus de temps à accompagner les patients et moins en tâches répétitives.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-16 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 border border-emerald-900/50 text-center max-w-4xl mx-auto shadow-2xl">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-400/30">
                Prêt à démarrer ?
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight mb-4">
                Simplifiez votre gestion santé dès aujourd hui
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Créez votre compte gratuit en moins de 2 minutes et rejoignez les milliers d utilisateurs qui gagnent du temps chaque semaine.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-600/30">
                  Créer mon compte patient
                </Link>
                <Link to="/login" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/20">
                  Accès espace professionnel
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <span className="text-lg font-extrabold font-heading text-white">
                Pharma<span className="text-emerald-500">Connect</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
              Plateforme numérique de mise en relation patient-officine. Développée dans le respect strict des directives pharmaceutiques et des standards de santé.
            </p>
            <span className="inline-block px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[11px] font-semibold">
              Protection et sécurité des données médicales
            </span>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Navigation</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#search-section" className="hover:text-emerald-400 transition-colors">Recherche Médicaments</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">Fonctionnement</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Dépôt d ordonnance</a></li>
              <li><a href="#pharmacies" className="hover:text-emerald-400 transition-colors">Espace Pharmacies</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Urgences & Santé</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Pharmacies de garde à proximité</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Services d urgences médicales</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Centre antipoison</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Annuaire des officines</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Légal & Éthique</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Protection des données</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Conditions Générales d Utilisation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Charte de confidentialité</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Mentions légales</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>&copy; {new Date().getFullYear()} PharmaConnect Technologies. Tous droits réservés.</div>
          <div>Respect des décrets de télépharmacie & bonnes pratiques officinales</div>
        </div>
      </footer>

      {/* MODALE DETAILS MEDICAMENT */}
      {selectedMedicineDetail && (
        <MedicineDetailModal
          medicine={selectedMedicineDetail}
          onClose={() => setSelectedMedicineDetail(null)}
          onAddToCart={(med) => {
            onAddToCart(med);
            setSelectedMedicineDetail(null);
            onOpenCart();
          }}
        />
      )}
    </div>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart Handlers
  const handleAddToCart = (medicine) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === medicine.id);
      if (existing) {
        return prev.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (medicineId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(medicineId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === medicineId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (medicineId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== medicineId));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              onOpenCart={() => setIsCartOpen(true)}
              cartCount={totalCartCount}
              onAddToCart={handleAddToCart}
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>

      {/* Global Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutSuccess={(reservation) => {
          console.log("Réservation confirmée :", reservation);
          setCartItems([]);
        }}
      />

      {/* PWA Install Banner */}
      <PWAInstallPrompt />
    </Router>
  );
}

export default App;
