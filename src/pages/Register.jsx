import { useState, useId } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
  });

  const firstnameId = useId();
  const lastnameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const passwordId = useId();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calcul du niveau de force du mot de passe
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const passwordScore = getPasswordStrength(formData.password);

  const getStrengthLabel = (score) => {
    switch (score) {
      case 0:
      case 1:
        return { label: 'Trop court', color: '#ef4444', percent: 25 };
      case 2:
        return { label: 'Moyen', color: '#f59e0b', percent: 50 };
      case 3:
        return { label: 'Bon', color: '#10b981', percent: 75 };
      case 4:
        return { label: 'Sécurisé', color: '#059669', percent: 100 };
      default:
        return { label: '', color: '#e2e8f0', percent: 0 };
    }
  };

  const strength = getStrengthLabel(passwordScore);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) return;
    setLoading(true);
    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="auth-layout">
      {/* Panneau Gauche : Réassurance Santé (Desktop) */}
      <aside className="auth-side-brand">
        <div className="brand-header">
          <Link to="/" className="brand-logo">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
            <span className="brand-name">Pharma<span>Connect</span></span>
          </Link>
          <span className="badge-official">Espace Patient</span>
        </div>

        <div className="brand-hero">
          <h1>Vos médicaments en toute simplicité.</h1>
          <p>
            Commandez vos ordonnances et vos traitements en ligne, suivez leur préparation
            en temps réel et retirez-les sans attente dans votre pharmacie partenaire.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div>
                <strong>Retrait express en officine</strong>
                <p>Vos ordonnances préparées à l'avance pour éviter les files d'attente.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <strong>Données médicales confidentielles</strong>
                <p>Vos données personnelles et ordonnances sont protégées et chiffrées de bout en bout.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <strong>Pharmacies de garde 24h/24</strong>
                <p>Accédez instantanément aux coordonnées et disponibilités des officines de garde.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="trust-footer">
          <div className="trust-stats">
            <div className="stat">
              <span className="stat-value">100+</span>
              <span className="stat-label">Pharmacies partenaires</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">15 min</span>
              <span className="stat-label">Préparation moyenne</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Panneau Droit : Formulaire Inscription Patient */}
      <main className="auth-main">
        <div className="auth-card">
          <header className="auth-card-header">
            <div className="mobile-brand">
              <Link to="/" className="brand-logo">
                <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <span className="brand-name">Pharma<span>Connect</span></span>
              </Link>
            </div>
            <h2>Créer votre compte patient</h2>
            <p>Renseignez vos coordonnées pour activer votre espace personnel.</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Identité Personnelle */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor={firstnameId}>Prénom</label>
                <input
                  type="text"
                  id={firstnameId}
                  name="firstname"
                  placeholder="Jean"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={lastnameId}>Nom</label>
                <input
                  type="text"
                  id={lastnameId}
                  name="lastname"
                  placeholder="Dupont"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Téléphone (SMS & Notifications retrait) */}
            <div className="form-group">
              <label htmlFor={phoneId}>
                Numéro de téléphone
                <span className="field-hint">(Pour les alertes SMS et le retrait)</span>
              </label>
              <div className="phone-input-wrapper">
                <span className="phone-prefix">+229</span>
                <input
                  type="tel"
                  id={phoneId}
                  name="phone"
                  placeholder="61 00 00 00"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor={emailId}>Adresse email</label>
              <input
                type="email"
                id={emailId}
                name="email"
                placeholder="nom@exemple.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mot de passe avec toggle & indicateur de force */}
            <div className="form-group">
              <div className="label-with-action">
                <label htmlFor={passwordId}>Mot de passe</label>
                <button
                  type="button"
                  className="btn-toggle-pwd"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>

              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id={passwordId}
                  name="password"
                  placeholder="8 caractères minimum"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {formData.password && (
                <div className="password-strength-container">
                  <div className="strength-bar-bg">
                    <div
                      className="strength-bar-fill"
                      style={{
                        width: `${strength.percent}%`,
                        backgroundColor: strength.color,
                      }}
                    ></div>
                  </div>
                  <span className="strength-text" style={{ color: strength.color }}>
                    Niveau : {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Conditions d'utilisation */}
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <span>
                J'accepte les <a href="#terms">conditions d'utilisation</a> et la{' '}
                <a href="#privacy">politique de protection des données</a>.
              </span>
            </label>

            {/* Bouton d'action */}
            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={loading || !termsAccepted}
            >
              {loading ? (
                <span className="loading-spinner">Création du compte...</span>
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          <footer className="auth-card-footer">
            <p>
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="login-link">
                Se connecter
              </Link>
            </p>
          </footer>
        </div>
      </main>

      <style jsx>{`
        .auth-layout {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          background: #f8fafc;
        }

        /* --- PANNEAU GAUCHE MARQUE & REASSURANCE --- */
        .auth-side-brand {
          background: linear-gradient(165deg, #064e3b 0%, #059669 60%, #0284c7 100%);
          color: white;
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .auth-side-brand::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.12), transparent 70%);
          pointer-events: none;
        }

        .brand-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
          color: white;
        }

        .logo-icon {
          width: 28px;
          height: 28px;
          stroke: #ffffff;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .brand-name span {
          color: #a7f3d0;
        }

        .badge-official {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .brand-hero h1 {
          font-size: 2.2rem;
          line-height: 1.25;
          margin-bottom: 1.25rem;
          color: white;
          font-weight: 800;
        }

        .brand-hero p {
          color: #e6f4ea;
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 480px;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .feature-icon-wrapper {
          width: 38px;
          height: 38px;
          min-width: 38px;
          border-radius: 0.65rem;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-icon-wrapper svg {
          width: 20px;
          height: 20px;
          stroke: #ffffff;
        }

        .feature-item strong {
          display: block;
          font-size: 1rem;
          margin-bottom: 0.2rem;
          color: #ffffff;
        }

        .feature-item p {
          margin: 0;
          font-size: 0.875rem;
          color: #d1fae5;
          line-height: 1.4;
        }

        .trust-footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .trust-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .stat-value {
          display: block;
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #a7f3d0;
        }

        .stat-divider {
          width: 1px;
          height: 35px;
          background: rgba(255, 255, 255, 0.2);
        }

        /* --- PANNEAU DROIT FORMULAIRE --- */
        .auth-main {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          background: #f8fafc;
        }

        .auth-card {
          width: 100%;
          max-width: 500px;
          background: #ffffff;
          padding: 2.75rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.06);
          border: 1px solid #e2e8f0;
        }

        .mobile-brand {
          display: none;
          margin-bottom: 1.5rem;
        }

        .mobile-brand .brand-logo {
          color: #059669;
        }

        .mobile-brand .logo-icon {
          stroke: #059669;
        }

        .mobile-brand .brand-name span {
          color: #0f172a;
        }

        .auth-card-header h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.35rem;
        }

        .auth-card-header p {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .field-hint {
          font-weight: 400;
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .label-with-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-toggle-pwd {
          background: none;
          font-size: 0.78rem;
          color: #059669;
          font-weight: 600;
          padding: 0;
          cursor: pointer;
        }

        input {
          width: 100%;
          padding: 0.75rem 0.95rem;
          border-radius: 0.75rem;
          border: 1.5px solid #e2e8f0;
          font-size: 0.95rem;
          color: #0f172a;
          background: #ffffff;
          transition: all 0.2s ease;
        }

        input:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
        }

        .phone-input-wrapper {
          display: flex;
          align-items: center;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.75rem;
          overflow: hidden;
          background: #ffffff;
          transition: border-color 0.2s ease;
        }

        .phone-input-wrapper:focus-within {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
        }

        .phone-prefix {
          padding: 0.75rem 0.85rem;
          background: #f8fafc;
          border-right: 1px solid #e2e8f0;
          font-weight: 600;
          font-size: 0.9rem;
          color: #475569;
        }

        .phone-input-wrapper input {
          border: none;
          border-radius: 0;
          box-shadow: none !important;
        }

        /* Barre de robustesse mot de passe */
        .password-strength-container {
          margin-top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .strength-bar-bg {
          flex: 1;
          height: 5px;
          background: #e2e8f0;
          border-radius: 9999px;
          overflow: hidden;
        }

        .strength-bar-fill {
          height: 100%;
          transition: width 0.3s ease, background-color 0.3s ease;
        }

        .strength-text {
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Checkbox CGU */
        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.4;
          cursor: pointer;
          margin-top: 0.25rem;
        }

        .terms-checkbox input {
          width: auto;
          margin-top: 0.15rem;
          accent-color: #059669;
        }

        .terms-checkbox a {
          color: #059669;
          font-weight: 600;
        }

        .btn-submit {
          width: 100%;
          padding: 0.85rem;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 0.75rem;
          background: #059669;
          color: white;
          margin-top: 0.5rem;
          transition: background 0.2s ease, transform 0.1s ease;
        }

        .btn-submit:hover:not(:disabled) {
          background: #047857;
          transform: translateY(-1px);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-card-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: #64748b;
        }

        .login-link {
          color: #059669;
          font-weight: 700;
        }

        /* Responsive Mobile */
        @media (max-width: 960px) {
          .auth-layout {
            grid-template-columns: 1fr;
          }

          .auth-side-brand {
            display: none;
          }

          .mobile-brand {
            display: block;
          }

          .auth-main {
            padding: 1.5rem 1rem;
          }

          .auth-card {
            padding: 2rem 1.5rem;
            box-shadow: none;
            border: none;
            background: transparent;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
