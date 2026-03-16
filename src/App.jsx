import { useState } from 'react'
import LandingPage from './pages/LandingPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx';
import './App.css'

const AppView = {
  LANDING: 'LANDING',
  LOGIN: 'LOGIN',
  DASHBOARD: 'DASHBOARD',
  SCHEDULER: 'SCHEDULER',
  REGISTER: 'REGISTER',
  SUCCESS: 'SUCCESS',
  MFA_CHOICE: 'MFA_CHOICE',
  QR_SETUP: 'QR_SETUP'
};

function App() {
  const [count, setCount] = useState(0)
  const [view, setView] = useState(AppView.LANDING);



  const renderView = () => {
    switch (view) {
      case AppView.LANDING:
        return <LandingPage onNavigate={setView} />;
      case AppView.LOGIN:
        return <LoginPage onNavigate={setView} />;
      case AppView.REGISTER:
        return <RegisterPage onNavigate={setView} />;
      default:
        return <LandingPage onNavigate={setView} />;
    }
  };
  return (
    <>
      <header className="header">
        <div className="brand">MsgCause</div>

        <div className="nav-actions">
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </nav>

          <div className="auth-buttons">
            <button className="button button-primary">Sign Up</button>
            <button className="button button-outline">Member Login</button>
          </div>
        </div>
      </header>

      <main>
        {renderView()}
      </main>
            <footer className="footer-section">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-icon" role="img" aria-label="bullhorn">📢</span>
            <span className="footer-title">MsgCause</span>
            <p className="footer-desc">
              Empowering social change through better communication technology
            </p>
          </div>
          <div className="footer-columns">
            <div className="footer-col">
              <div className="footer-heading">Product</div>
              <a href="#">Features</a>
              <a href="#">Integrations</a>
              <a href="#">Pricing</a>
            </div>
            <div className="footer-col">
              <div className="footer-heading">Resources</div>
              <a href="#">Blog</a>
              <a href="#">Support Center</a>
              <a href="#">Case Studies</a>
            </div>
            <div className="footer-col">
              <div className="footer-heading">Company</div>
              <a href="#">About Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <hr className="footer-separator" />
          <div className="footer-bottom-content">
            <span className="footer-copyright">
              © 2026 MsgCause Inc. All rights reserved.
            </span>
            <span className="footer-social">
              <a href="https://msgcause.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="Website">🌐</a>
              <a href="mailto:info@msgcause.com" className="footer-social-icon" title="Email">✉️</a>
              <a href="#" className="footer-social-icon" title="Text">📱</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
