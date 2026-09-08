import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import MedicineCard from './components/MedicineCard';
import { 
  mockMedicines, 
  categories,
  mockPharmacies,
  mockHeroLiveItems,
  mockPlatformMetrics
} from './data/mockData';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [activeTab, setActiveTab] = useState('patient');
  const [prescriptionSent, setPrescriptionSent] = useState(false);
  const [fileName, setFileName] = useState('');

  // Filtering medicines
  const filteredMedicines = useMemo(() => {
    return mockMedicines.filter((med) => {
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            med.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            med.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'Tous' || med.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handlePrescriptionSim = (e) => {
    e.preventDefault();
    if (!fileName) return;
    setPrescriptionSent(true);
    setTimeout(() => {
      // Auto reset message after 6s
      setPrescriptionSent(false);
      setFileName('');
    }, 6000);
  };

  return (
    <div className="app-container">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-pattern-bg"></div>
          <div className="container hero-layout">
            <div className="hero-text-block">
              <h1 className="hero-title">
                Trouvez vos traitements, <span className="highlight-text">évitez les ruptures</span> et transmettez vos ordonnances.
              </h1>
              
              <p className="hero-subtitle">
                PharmaConnect synchronise l'inventaire des pharmacies en direct. 
                Vérifiez la disponibilité immédiate de vos médicaments, réservez vos boîtes ou envoyez votre ordonnance avant votre passage au comptoir.
              </p>

              {/* Quick Search Bar directly in Hero */}
              <div className="hero-quicksearch">
                <div className="search-input-wrap">
                  <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Ex. Paracétamol, Doliprane, Amoxicilline, Vitamine C..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button className="clear-btn" onClick={() => setSearchQuery('')} aria-label="Effacer">
                      ✕
                    </button>
                  )}
                </div>
                <a href="#search-section" className="btn btn-hero-cta">
                  Rechercher
                </a>
              </div>

              <div className="hero-trust-badges">
                <div className="trust-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                  <span>Données de santé chiffrées & protégées</span>
                </div>
                <div className="trust-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>Mise à jour toutes les 15 min</span>
                </div>
                <div className="trust-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>+1 400 officines partenaires</span>
                </div>
              </div>
            </div>

            {/* Live Interactive Hero Card / Simulator */}
            <div className="hero-widget-block">
              <div className="live-preview-card">
                <div className="card-top-header">
                  <div className="pharmacy-meta">
                    <div className="avatar-pharm">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21h18M5 21V7l8-4 6 4v14M12 11v6M9 14h6" />
                      </svg>
                    </div>
                    <div>
                      <div className="pharm-name">Pharmacie Centrale du Plateau</div>
                      <div className="pharm-distance">À 450m • Ouverte jusqu'à 22h00</div>
                    </div>
                  </div>
                  <span className="live-pill">Direct</span>
                </div>

                <div className="demo-med-list">
                  {mockHeroLiveItems.map((item) => (
                    <div key={item.id} className="demo-item">
                      <div className="demo-item-info">
                        <div className="demo-title">{item.title}</div>
                        <div className="demo-detail">{item.detail}</div>
                      </div>
                      <span className={item.statusType === 'low_stock' ? 'badge-stock-warning' : 'badge-stock-in'}>
                        {item.statusBadge}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="widget-action-panel">
                  <div className="widget-step-text">
                    <strong>Préparation express :</strong> Votre ordonnance préparée en moins de 30 minutes sans attente au guichet.
                  </div>
                  <Link to="/register" className="btn btn-sm-action">
                    Créer mon pass santé
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS STRIP */}
        <section className="metrics-strip">
          <div className="container strip-grid">
            {mockPlatformMetrics.map((metric, idx) => (
              <React.Fragment key={metric.id}>
                <div className="strip-item">
                  <div className="strip-value">{metric.value}</div>
                  <div className="strip-label">{metric.label}</div>
                </div>
                {idx < mockPlatformMetrics.length - 1 && <div className="strip-divider"></div>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* LIVE INVENTORY EXPLORER */}
        <section className="section catalog-section" id="search-section">
          <div className="container">
            <div className="section-head-split">
              <div>
                <span className="section-sub">Disponibilité Officinale</span>
                <h2 className="section-title">Consultez les stocks disponibles en direct</h2>
                <p className="section-desc">
                  Recherchez par dénomination commune internationale (DCI), nom commercial ou pathologie.
                </p>
              </div>

              <div className="catalog-status">
                <span className="status-indicator"></span>
                <span>Serveur d'officines synchronisé</span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="category-scroll-bar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Medicines Grid */}
            {filteredMedicines.length > 0 ? (
              <div className="meds-grid">
                {filteredMedicines.map((med) => (
                  <MedicineCard key={med.id} medicine={med} />
                ))}
              </div>
            ) : (
              <div className="empty-results-box">
                <div className="empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </div>
                <h3>Aucun produit ne correspond à votre recherche</h3>
                <p>Essayez un autre mot-clé (ex: "paracétamol", "antibiotique") ou sélectionnez une autre catégorie.</p>
                <button 
                  className="btn btn-secondary btn-reset" 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('Tous'); }}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ORDONNANCE & HOW IT WORKS */}
        <section className="section how-it-works-section" id="how-it-works">
          <div className="container">
            <div className="text-center-wrapper">
              <span className="section-sub">Parcours simplifié</span>
              <h2 className="section-title">Comment fonctionne PharmaConnect ?</h2>
              <p className="section-desc max-600">
                Un circuit de santé fluide, du cabinet médical jusqu’à la délivrance sécurisée de votre traitement.
              </p>
            </div>

            <div className="steps-container">
              <div className="step-card">
                <div className="step-num">01</div>
                <div className="step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3>Vérification des stocks</h3>
                <p>Consultez en 1 clic si le traitement prescrit est bien disponible dans l'une des officines à proximité.</p>
              </div>

              <div className="step-card highlight-step">
                <div className="step-num">02</div>
                <div className="step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3>Télétransmission chiffrée</h3>
                <p>Photographiez ou importez votre ordonnance. Elle est transmise sous protocole sécurisé de santé à votre pharmacien.</p>
              </div>

              <div className="step-card">
                <div className="step-num">03</div>
                <div className="step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3>Retrait coupe-file ou livraison</h3>
                <p>Recevez une notification SMS dès que votre commande est prête. Passez au comptoir prioritaire sans patienter.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRESCRIPTION UPLOAD SIMULATOR / INTERACTIVE FEATURE */}
        <section className="section upload-section" id="services">
          <div className="container">
            <div className="upload-box-wrapper">
              <div className="upload-info">
                <span className="badge-inline">Service Sécurisé</span>
                <h2>Déposez votre ordonnance en toute tranquillité</h2>
                <p>
                  Gagnez du temps pour vos renouvellements ou ordonnances urgentes. Votre pharmacien valide les posologies 
                  et prépare votre sachet nominatif avant même votre arrivée.
                </p>

                <div className="security-checks">
                  <div className="check-point">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Chiffrement bout en bout de vos documents médicaux</span>
                  </div>
                  <div className="check-point">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Vérification systématique des interactions médicamenteuses</span>
                  </div>
                  <div className="check-point">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Gratuit et sans engagement</span>
                  </div>
                </div>
              </div>

              <div className="upload-card">
                <form onSubmit={handlePrescriptionSim} className="upload-form">
                  <div className="dropzone-area">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <div className="dropzone-text">
                      <strong>Glissez votre ordonnance ici</strong>
                      <span>ou sélectionnez un fichier (PDF, JPG, PNG)</span>
                    </div>
                    <input 
                      type="file" 
                      id="prescription-file" 
                      className="hidden-file-input" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                    <label htmlFor="prescription-file" className="btn btn-secondary btn-select-file">
                      {fileName ? `Fichier : ${fileName}` : "Parcourir mes documents"}
                    </label>
                  </div>

                  <div className="form-row">
                    <label>Pharmacie de retrait souhaitée</label>
                    <select className="form-select" defaultValue={mockPharmacies[0]?.id}>
                      {mockPharmacies.map((pharmacy) => (
                        <option key={pharmacy.id} value={pharmacy.id}>
                          {pharmacy.name} ({pharmacy.distance}) - {pharmacy.statusText}
                        </option>
                      ))}
                    </select>
                  </div>

                  {prescriptionSent ? (
                    <div className="alert-success">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span>Ordonnance transmise avec succès ! L'équipe prépare votre commande.</span>
                    </div>
                  ) : (
                    <button type="submit" className="btn btn-full-submit" disabled={!fileName}>
                      Transmettre pour préparation immédiate
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* TARGET AUDIENCE TABBED SECTION */}
        <section className="section solutions-section" id="pharmacies">
          <div className="container">
            <div className="text-center-wrapper">
              <span className="section-sub">Écosystème Global</span>
              <h2 className="section-title">Une solution pensée pour tout l'écosystème</h2>
            </div>

            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'patient' ? 'active' : ''}`}
                onClick={() => setActiveTab('patient')}
              >
                Pour les Patients
              </button>
              <button 
                className={`tab-btn ${activeTab === 'pharmacy' ? 'active' : ''}`}
                onClick={() => setActiveTab('pharmacy')}
              >
                Pour les Professionnels & Officines
              </button>
            </div>

            <div className="tab-content-panel">
              {activeTab === 'patient' ? (
                <div className="tab-grid">
                  <div className="tab-card">
                    <div className="tab-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <h4>Zéro déplacement inutile</h4>
                    <p>Ne courez plus d'une pharmacie à l'autre en cas de rupture de stock ou pénurie temporaire.</p>
                  </div>
                  <div className="tab-card">
                    <div className="tab-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <h4>Dossier Sécurisé</h4>
                    <p>Conservez l'historique de vos ordonnances et la posologie de vos traitements au même endroit.</p>
                  </div>
                  <div className="tab-card">
                    <div className="tab-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                    </div>
                    <h4>Rappels de Renouvellement</h4>
                    <p>Soyez notifié quelques jours avant la fin de votre boîte pour anticiper sans interruption de soins.</p>
                  </div>
                </div>
              ) : (
                <div className="tab-grid">
                  <div className="tab-card">
                    <div className="tab-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                      </svg>
                    </div>
                    <h4>Dégorgement des files d'attente</h4>
                    <p>Préparez les ordonnances pendant les heures calmes et offrez un comptoir dédié au retrait express.</p>
                  </div>
                  <div className="tab-card">
                    <div className="tab-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                      </svg>
                    </div>
                    <h4>Synchronisation LGO & ERP</h4>
                    <p>Intégration directe avec vos logiciels officinaux pour une mise à jour des stocks sans double saisie.</p>
                  </div>
                  <div className="tab-card">
                    <div className="tab-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h4>Valorisation du conseil</h4>
                    <p>Passez plus de temps à conseiller vos patients et moins de temps en tâches administratives répétitives.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="section cta-banner-section">
          <div className="container">
            <div className="cta-banner">
              <div className="cta-badge">Prêt à démarrer ?</div>
              <h2>Simplifiez votre gestion santé dès aujourd'hui</h2>
              <p>
                Créez votre compte gratuit en moins de 2 minutes et rejoignez les milliers d'utilisateurs qui gagnent du temps chaque semaine.
              </p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-cta-primary">
                  Créer mon compte patient
                </Link>
                <Link to="/login" className="btn btn-cta-outline">
                  Accès espace professionnel
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer-site">
        <div className="container footer-grid">
          <div className="footer-col-main">
            <div className="logo-footer">
              <span className="brand-name">Pharma<span className="brand-accent">Connect</span></span>
            </div>
            <p className="footer-lead">
              Plateforme numérique de mise en relation patient-officine. Développée dans le respect strict des normes de santé publique et des directives pharmaceutiques.
            </p>
            <div className="legal-tag">Protection et sécurité des données médicales</div>
          </div>

          <div className="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><a href="#search-section">Recherche Médicaments</a></li>
              <li><a href="#how-it-works">Fonctionnement</a></li>
              <li><a href="#services">Dépôt d'ordonnance</a></li>
              <li><a href="#pharmacies">Espace Pharmacies</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Urgences & Santé</h5>
            <ul>
              <li><a href="#">Pharmacies de garde à proximité</a></li>
              <li><a href="#">Services d'urgences médicales</a></li>
              <li><a href="#">Centre antipoison</a></li>
              <li><a href="#">Annuaire des officines</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Légal & Confidentialité</h5>
            <ul>
              <li><a href="#">Protection des données (RGPD)</a></li>
              <li><a href="#">Conditions Générales d'Utilisation</a></li>
              <li><a href="#">Sécurité & Hébergement HDS</a></li>
              <li><a href="#">Mentions légales</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-flex">
            <span>&copy; {new Date().getFullYear()} PharmaConnect Technologies. Tous droits réservés.</span>
            <div className="footer-bottom-links">
              <span>Respect des décrets de télépharmacie</span>
            </div>
          </div>
        </div>
      </footer>

      {/* COMPONENT STYLES */}
      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg-page);
        }

        /* Hero */
        .hero-section {
          position: relative;
          min-height: calc(100vh - 65px);
          display: flex;
          align-items: center;
          padding: 3rem 0;
          background: linear-gradient(180deg, #f0fdf4 0%, #f8fafc 100%);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        .hero-pattern-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(#cbd5e1 0.75px, transparent 0.75px);
          background-size: 24px 24px;
          opacity: 0.35;
          pointer-events: none;
        }

        .hero-layout {
          width: 100%;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: clamp(2.4rem, 4.2vw, 3.6rem);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
        }

        .highlight-text {
          background: linear-gradient(120deg, var(--primary) 0%, #0d9488 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 580px;
        }

        .hero-quicksearch {
          display: flex;
          gap: 0.65rem;
          background: white;
          padding: 0.4rem;
          border-radius: var(--radius-lg);
          border: 1px solid #cbd5e1;
          box-shadow: var(--shadow-md);
          max-width: 600px;
          margin-bottom: 1.75rem;
        }

        .search-input-wrap {
          display: flex;
          align-items: center;
          flex-grow: 1;
          padding: 0 0.75rem;
          gap: 0.6rem;
        }

        .search-icon {
          color: #94a3b8;
          flex-shrink: 0;
        }

        .search-input-wrap input {
          width: 100%;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          color: var(--text-main);
          background: transparent;
        }

        .search-input-wrap input::placeholder {
          color: #94a3b8;
        }

        .clear-btn {
          background: transparent;
          color: #94a3b8;
          font-size: 0.85rem;
          padding: 0.2rem 0.5rem;
          border-radius: 50%;
        }

        .btn-hero-cta {
          padding: 0.75rem 1.6rem;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: var(--radius-md);
          flex-shrink: 0;
        }

        .hero-trust-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
        }

        /* Hero Live Widget */
        .live-preview-card {
          background: #ffffff;
          border-radius: var(--radius-xl);
          padding: 1.75rem;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--border);
          position: relative;
        }

        .card-top-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1.25rem;
        }

        .pharmacy-meta {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .avatar-pharm {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--primary-light);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pharm-name {
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .pharm-distance {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .live-pill {
          background: #fee2e2;
          color: #b91c1c;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .demo-med-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .demo-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--bg-subtle);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .demo-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .demo-detail {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .badge-stock-in {
          font-size: 0.72rem;
          font-weight: 700;
          color: #065f46;
          background: #d1fae5;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .badge-stock-warning {
          font-size: 0.72rem;
          font-weight: 700;
          color: #92400e;
          background: #fef3c7;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .widget-action-panel {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          padding: 1rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .widget-step-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .widget-step-text strong {
          color: var(--text-main);
        }

        .btn-sm-action {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          background: var(--text-main);
          color: white;
          border-radius: var(--radius-md);
          white-space: nowrap;
          font-weight: 600;
        }

        .btn-sm-action:hover {
          background: #000000;
          color: white;
        }

        /* Metrics Strip */
        .metrics-strip {
          background: #0f172a;
          color: white;
          padding: 2.25rem 0;
        }

        .strip-grid {
          display: grid;
          grid-template-columns: repeat(7, auto);
          align-items: center;
          justify-content: space-between;
        }

        .strip-item {
          text-align: center;
        }

        .strip-value {
          font-family: var(--font-heading);
          font-size: 2.1rem;
          font-weight: 800;
          color: #34d399;
          letter-spacing: -0.02em;
        }

        .strip-label {
          font-size: 0.82rem;
          color: #94a3b8;
          font-weight: 500;
          margin-top: 0.25rem;
        }

        .strip-divider {
          width: 1px;
          height: 38px;
          background: rgba(255, 255, 255, 0.12);
        }

        /* Sections Common */
        .section {
          padding: 5.5rem 0;
        }

        .section-sub {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-size: clamp(1.8rem, 3.2vw, 2.4rem);
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.6rem;
        }

        .section-desc {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .max-600 {
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .text-center-wrapper {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        /* Catalog Explorer */
        .catalog-section {
          background: #f8fafc;
          border-bottom: 1px solid var(--border);
        }

        .section-head-split {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .catalog-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: #059669;
          background: #ecfdf5;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid #a7f3d0;
        }

        .status-indicator {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
        }

        .category-scroll-bar {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.75rem;
          margin-bottom: 2rem;
          scrollbar-width: thin;
        }

        .category-chip {
          padding: 0.5rem 1.1rem;
          font-size: 0.88rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          background: white;
          color: var(--text-muted);
          border: 1px solid var(--border);
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .category-chip:hover {
          background: var(--bg-subtle);
          color: var(--text-main);
        }

        .category-chip.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);
        }

        .meds-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.75rem;
        }

        .empty-results-box {
          background: white;
          border-radius: var(--radius-xl);
          padding: 4rem 2rem;
          text-align: center;
          border: 1px dashed #cbd5e1;
        }

        .empty-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--bg-subtle);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .empty-results-box h3 {
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .empty-results-box p {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .btn-reset {
          padding: 0.6rem 1.25rem;
        }

        /* How it works */
        .how-it-works-section {
          background: white;
          border-bottom: 1px solid var(--border);
        }

        .steps-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .step-card {
          background: var(--bg-page);
          border-radius: var(--radius-lg);
          padding: 2.5rem 2rem;
          border: 1px solid var(--border);
          position: relative;
          transition: transform 0.2s ease;
        }

        .step-card:hover {
          transform: translateY(-3px);
        }

        .step-card.highlight-step {
          background: #f0fdf4;
          border-color: #a7f3d0;
        }

        .step-num {
          font-size: 2.2rem;
          font-weight: 800;
          color: #cbd5e1;
          font-family: var(--font-heading);
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .highlight-step .step-num {
          color: #6ee7b7;
        }

        .step-icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: white;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
          margin-bottom: 1.5rem;
        }

        .step-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .step-card p {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
        }

        /* Upload prescription Section */
        .upload-section {
          background: #f8fafc;
          border-bottom: 1px solid var(--border);
        }

        .upload-box-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        .badge-inline {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--primary);
          background: var(--primary-light);
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          margin-bottom: 1rem;
        }

        .upload-info h2 {
          font-size: 2.2rem;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .upload-info p {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .security-checks {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .check-point {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .upload-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: 2.25rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border);
        }

        .dropzone-area {
          border: 2px dashed #94a3b8;
          border-radius: var(--radius-lg);
          padding: 2.25rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-subtle);
          margin-bottom: 1.5rem;
          transition: border-color 0.2s;
        }

        .dropzone-area:hover {
          border-color: var(--primary);
        }

        .dropzone-text {
          margin-top: 0.85rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .dropzone-text strong {
          color: var(--text-main);
          font-size: 0.95rem;
        }

        .dropzone-text span {
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .hidden-file-input {
          display: none;
        }

        .btn-select-file {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .form-row {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1.5rem;
        }

        .form-row label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .form-select {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          font-family: inherit;
          font-size: 0.92rem;
          color: var(--text-main);
          outline: none;
          background: white;
        }

        .form-select:focus {
          border-color: var(--primary);
        }

        .btn-full-submit {
          width: 100%;
          padding: 0.9rem;
          font-size: 0.95rem;
          border-radius: var(--radius-md);
        }

        .btn-full-submit:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .alert-success {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 600;
        }

        /* Solutions Tabbed */
        .solutions-section {
          background: white;
          border-bottom: 1px solid var(--border);
        }

        .tab-buttons {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 3rem;
        }

        .tab-btn {
          padding: 0.75rem 1.75rem;
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          font-weight: 700;
          background: var(--bg-subtle);
          color: var(--text-muted);
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          background: var(--text-main);
          color: white;
          box-shadow: var(--shadow-sm);
        }

        .tab-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .tab-card {
          padding: 2.25rem;
          border-radius: var(--radius-lg);
          background: var(--bg-page);
          border: 1px solid var(--border);
        }

        .tab-card-icon {
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }

        .tab-card h4 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
        }

        .tab-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* CTA Banner */
        .cta-banner-section {
          padding: 5rem 0;
          background: var(--bg-page);
        }

        .cta-banner {
          background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%);
          border-radius: var(--radius-xl);
          padding: 4.5rem 3rem;
          text-align: center;
          color: white;
          box-shadow: var(--shadow-xl);
          position: relative;
          overflow: hidden;
        }

        .cta-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          padding: 0.35rem 0.9rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.25rem;
        }

        .cta-banner h2 {
          color: white;
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          margin-bottom: 1rem;
        }

        .cta-banner p {
          font-size: 1.1rem;
          color: #d1fae5;
          max-width: 620px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .btn-cta-primary {
          background: #ffffff;
          color: #064e3b;
          font-weight: 700;
          padding: 0.85rem 1.85rem;
        }

        .btn-cta-primary:hover {
          background: #f0fdf4;
          color: #064e3b;
        }

        .btn-cta-outline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          font-weight: 600;
          padding: 0.85rem 1.85rem;
        }

        .btn-cta-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
          color: white;
        }

        /* Footer */
        .footer-site {
          background: #0b1120;
          color: #94a3b8;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 4.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3.5rem;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: white;
        }

        .brand-accent {
          color: #34d399;
        }

        .footer-lead {
          font-size: 0.88rem;
          line-height: 1.6;
          margin-top: 1rem;
          margin-bottom: 1.25rem;
          max-width: 360px;
        }

        .legal-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          color: #34d399;
          background: rgba(52, 211, 153, 0.1);
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(52, 211, 153, 0.2);
        }

        .footer-col h5 {
          color: white;
          font-size: 0.92rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }

        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-col a {
          color: #94a3b8;
          font-size: 0.85rem;
          transition: color 0.15s ease;
        }

        .footer-col a:hover {
          color: #34d399;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1.5rem 0;
          font-size: 0.8rem;
        }

        .footer-bottom-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .hero-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .strip-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .strip-divider { display: none; }
          .upload-box-wrapper { grid-template-columns: 1fr; }
          .steps-container { grid-template-columns: 1fr; }
          .tab-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px) {
          .hero-quicksearch { flex-direction: column; }
          .btn-hero-cta { width: 100%; }
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
