import { useState, useId } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('client'); // 'client' | 'pharmacist'
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
    pharmacyName: '',
    rppsNumber: '',
    city: '',
  });

  const firstnameId = useId();
  const lastnameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const passwordId = useId();
  const pharmacyNameId = useId();
  const rppsId = useId();
  const cityId = useId();

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
        return { label: 'Trop court ou simple', color: '#ef4444', percent: 25 };
      case 2:
        return { label: 'Moyen', color: '#f59e0b', percent: 50 };
      case 3:
        return { label: 'Bon', color: '#10b981', percent: 75 };
      case 4:
        return { label: 'Très robuste', color: '#059669', percent: 100 };
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
      {/* Panneau Gauche : Réassurance & Marque (Desktop/Tablet) */}
      <aside className="auth-side-brand">
        <div className="brand-header">
          <Link to="/" className="brand-logo">
            <span className="logo-symbol">💊</span>
            <span className="brand-name">Pharma<span>Connect</span></span>
          </Link>
          <span className="badge-official">Plateforme Santé Certifiée</span>
        </div>

        <div className="brand-hero">
          <h1>Vos médicaments sans attente, en toute sécurité.</h1>
          <p>
            Rejoignez le premier réseau de santé connecté : localisez les pharmacies de garde,
            réservez vos traitements et retirez-les en moins de 15 minutes.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <strong>Retrait express par QR Code</strong>
                <p>Vos commandes préparées à l'avance sans faire la queue en officine.</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🛡️</span>
              <div>
                <strong>Données de santé confidentielles</strong>
                <p>Transmission chiffrée de vos ordonnances et conformité stricte aux normes médicales.</p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-icon">📍</span>
              <div>
                <strong>Pharmacies de garde 24h/7j</strong>
                <p>Géolocalisation en temps réel de l'officine ouverte la plus proche de chez vous.</p>
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
              <span className="stat-label">Délai moyen de retrait</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Panneau Droit : Formulaire d'inscription */}
      <main className="auth-main">
        <div className="auth-card">
          <header className="auth-card-header">
            <div className="mobile-brand">
              <Link to="/" className="brand-logo">
                <span className="logo-symbol">💊</span>
                <span className="brand-name">Pharma<span>Connect</span></span>
              </Link>
            </div>
            <h2>Créer un compte</h2>
            <p>Choisissez votre profil pour une expérience sur-mesure</p>

            {/* Switch de profil Client vs Pharmacie */}
            <div className="role-selector" role="tablist" aria-label="Type de compte">
              <button
                type="button"
                role="tab"
                aria-selected={role === 'client'}
                className={`role-btn ${role === 'client' ? 'active' : ''}`}
                onClick={() => setRole('client')}
              >
                <span className="role-icon">👤</span>
                <div>
                  <span className="role-title">Patient / Client</span>
                  <span className="role-subtitle">Pour réserver mes médicaments</span>
                </div>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={role === 'pharmacist'}
                className={`role-btn ${role === 'pharmacist' ? 'active' : ''}`}
                onClick={() => setRole('pharmacist')}
              >
                <span className="role-icon">🏥</span>
                <div>
                  <span className="role-title">Pharmacie</span>
                  <span className="role-subtitle">Pour gérer mon officine</span>
                </div>
              </button>
            </div>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Champs spécifiques Pharmacie */}
            {role === 'pharmacist' && (
              <div className="pro-fields-notice">
                <div className="form-group">
                  <label htmlFor={pharmacyNameId}>Nom de la pharmacie</label>
                  <input
                    type="text"
                    id={pharmacyNameId}
                    name="pharmacyName"
                    placeholder="Ex: Pharmacie Centrale"
                    value={formData.pharmacyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={rppsId}>N° d'enregistrement / RPPS</label>
                    <input
                      type="text"
                      id={rppsId}
                      name="rppsNumber"
                      placeholder="1000XXXXXXX"
                      value={formData.rppsNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={cityId}>Ville d'exercice</label>
                    <input
                      type="text"
                      id={cityId}
                      name="city"
                      placeholder="Ex: Cotonou"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

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

            {/* Téléphone (essentiel pour OTP et alertes SMS) */}
            <div className="form-group">
              <label htmlFor={phoneId}>
                Numéro de téléphone
                <span className="field-hint">(Utilisé pour les alertes SMS et le retrait)</span>
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

            {/* Mot de passe avec toggle visibilité et jauge */}
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
                    Force : {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Conditions Générales */}
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <span>
                J'accepte les <a href="#terms">Conditions d'Utilisation</a> et la{' '}
                <a href="#privacy">Politique de Confidentialité</a> des données de santé.
              </span>
            </label>

            {/* Bouton d'action avec état de chargement */}
            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={loading || !termsAccepted}
            >
              {loading ? (
                <span className="loading-spinner">Création du compte...</span>
              ) : role === 'pharmacist' ? (
                'Inscrire mon officine'
              ) : (
                'Créer mon compte Patient'
              )}
            </button>
          </form>

          <footer className="auth-card-footer">
            <p>
              Vous possédez déjà un compte ?{' '}
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

        /* --- PANNEAU GAUCHE BRAND --- */
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
          gap: 0.6rem;
          text-decoration: none;
          color: white;
        }

        .logo-symbol {
          font-size: 1.8rem;
          line-height: 1;
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

        .feature-icon {
          font-size: 1.3rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 0.75rem;
          padding: 0.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
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

        /* --- PANNEAU DROIT FORM --- */
        .auth-main {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          background: #f8fafc;
        }

        .auth-card {
          width: 100%;
          max-width: 520px;
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

        .auth-card-header h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.35rem;
        }

        .auth-card-header p {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        /* Rôle sélecteur */
        .role-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
          background: #f1f5f9;
          padding: 0.35rem;
          border-radius: 1rem;
        }

        .role-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 0.9rem;
          border-radius: 0.75rem;
          border: 1px solid transparent;
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .role-btn.active {
          background: #ffffff;
          border-color: #e2e8f0;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
        }

        .role-icon {
          font-size: 1.3rem;
        }

        .role-title {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f172a;
        }

        .role-subtitle {
          display: block;
          font-size: 0.72rem;
          color: #64748b;
        }

        /* Formulaire */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
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
          text-decoration: underline;
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

        /* Barre de force mot de passe */
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

        .pro-fields-notice {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          padding: 1rem;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 0.85rem;
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
