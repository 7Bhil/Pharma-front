import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount = 0, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo">
            <div className="logo-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <div className="logo-text-group">
              <span className="brand-name">Pharma<span className="brand-accent">Connect</span></span>
              <span className="brand-tagline">Santé & Officines</span>
            </div>
          </Link>

          <div className="nav-links desktop-only">
            <Link to="/dashboard" className="nav-link font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Mon Espace Patient</span>
            </Link>
            <a href="#search-section" className="nav-link">Rechercher un médicament</a>
            <a href="#how-it-works" className="nav-link">Comment ça marche</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#pharmacies" className="nav-link">Pour les pharmacies</a>
          </div>

          <div className="nav-actions">
            {/* Bouton Panier Express */}
            <button 
              type="button" 
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all border border-slate-200"
              title="Consulter le panier de réservation"
              aria-label="Panier de réservation"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/login" className="btn btn-secondary nav-btn">Connexion</Link>
            <Link to="/register" className="btn btn-primary nav-btn-cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
              <span>Créer un compte</span>
            </Link>
            
            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <a href="#search-section" onClick={() => setMobileMenuOpen(false)}>Rechercher</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>Comment ça marche</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#pharmacies" onClick={() => setMobileMenuOpen(false)}>Pour les pharmacies</a>
            <div className="mobile-drawer-actions">
              <Link to="/login" className="btn btn-secondary">Connexion</Link>
              <Link to="/register" className="btn btn-primary">Créer un compte</Link>
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }


        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          padding-bottom: 0.85rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .logo-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--primary), #047857);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(5, 150, 105, 0.28);
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-main);
          line-height: 1.1;
        }

        .brand-accent {
          color: var(--primary);
        }

        .brand-tagline {
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.15s ease;
          position: relative;
        }

        .nav-link:hover {
          color: var(--primary-hover);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nav-btn {
          padding: 0.6rem 1.1rem;
          font-size: 0.88rem;
        }

        .nav-btn-cta {
          padding: 0.6rem 1.25rem;
          font-size: 0.88rem;
        }

        .mobile-toggle {
          display: none;
          background: transparent;
          color: var(--text-main);
          padding: 0.4rem;
        }

        .mobile-drawer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: white;
          border-top: 1px solid var(--border);
        }

        .mobile-drawer a {
          color: var(--text-main);
          font-weight: 500;
          font-size: 1rem;
        }

        .mobile-drawer-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 960px) {
          .desktop-only { display: none; }
          .mobile-toggle { display: block; }
          .banner-links { display: none; }
          .nav-btn-cta span { display: none; }
          .nav-btn-cta { padding: 0.6rem 0.8rem; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
