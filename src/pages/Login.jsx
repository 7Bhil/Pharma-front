import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-container glass">
        <div className="auth-header">
          <Link to="/" className="logo">
            <span className="logo-text">Pharma<span>Connect</span></span>
          </Link>
          <h2>Ravie de vous revoir !</h2>
          <p>Connectez-vous pour accéder à votre espace santé.</p>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Adresse mail</label>
            <input type="email" id="email" placeholder="votre@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="••••••••" required />
          </div>
          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" /> Se souvenir de moi
            </label>
            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
          </div>
          <button type="submit" className="btn btn-primary btn-full">Se connecter</button>
        </form>

        <div className="auth-footer">
          <p>Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></p>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-light), #f8fafc);
          padding: 2rem;
        }

        .auth-container {
          width: 100%;
          max-width: 450px;
          padding: 3rem;
          border-radius: 2rem;
          background: white;
          box-shadow: var(--shadow-lg);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .logo {
          display: inline-block;
          margin-bottom: 1.5rem;
          text-decoration: none;
        }

        .logo-text {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--primary);
        }

        .logo-text span {
          color: #1e293b;
        }

        h2 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .auth-header p {
          color: var(--text-muted);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
        }

        input {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.2s;
        }

        input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        .auth-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: var(--text-muted);
        }

        .forgot-password {
          color: var(--primary);
          font-weight: 600;
        }

        .btn-full {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          margin-top: 0.5rem;
        }

        .auth-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .auth-footer a {
          color: var(--primary);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default Login;
