import { useState } from 'react'
import LandingPage from './pages/LandingPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx';
import FeaturesPage from './pages/FeaturesPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MemberLoginPage from './pages/MemberLoginPage.jsx';
import './App.css'

const AppView = {
  LANDING: 'LANDING',
  FEATURES: 'FEATURES',
  PRICING: 'PRICING',
  ABOUT: 'ABOUT',
  LOGIN: 'LOGIN',
  DASHBOARD: 'DASHBOARD',
  SCHEDULER: 'SCHEDULER',
  REGISTER: 'REGISTER',
  SUCCESS: 'SUCCESS',
  REGISTERED: 'REGISTERED',
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
        return <MemberLoginPage onNavigate={setView} />;
      case AppView.REGISTER:
        return <RegisterPage onNavigate={setView} />;
      case AppView.REGISTERED:
        return <RegisteredPage onNavigate={setView} />;
      case AppView.FEATURES:
        return <FeaturesPage onNavigate={setView} />;
      case AppView.PRICING:
        return <PricingPage onNavigate={setView} />;
      case AppView.ABOUT:
        return <AboutPage onNavigate={setView} />;
      default:
        return <LandingPage onNavigate={setView} />;
    }
  };
  return (
    <>
      <header className="header">
        <div className="brand">ConnectCard</div>

        <div className="nav-actions">
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#" onClick={(e) => { e.preventDefault(); setView(AppView.FEATURES); }}>Features</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setView(AppView.PRICING); }}>Pricing</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setView(AppView.ABOUT); }}>About</a>
          </nav>

          <div className="auth-buttons">
            <button className="button button-primary">Sign Up</button>
            <button className="button button-outline" onClick={() => setView(AppView.LOGIN)}>Member Login</button>
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
            <span className="footer-title">ConnectCards</span>
            <p className="footer-desc">
              Empowering social change through better communication technology
            </p>
          </div>
          <div className="footer-columns">
            <div className="footer-col">
              <div className="footer-heading">Product</div>
              <a href="#" onClick={(e) => { e.preventDefault(); setView(AppView.FEATURES); }}>Features</a>
              <a href="#">Integrations</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setView(AppView.PRICING); }}>Pricing</a>
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
