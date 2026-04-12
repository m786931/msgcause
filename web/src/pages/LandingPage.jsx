import React, { useState } from 'react';
import '../styles/LandingPage.css';

function LandingPage ({ onNavigate }) {
  const [step, setStep] = useState(1);
  
  return (
    <main className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <img 
            src="https://picsum.photos/800/800" 
            alt="Empower Your Cause" 
            className="hero-image"
          />
          <div className="hero-text">
            <h1 className="hero-title">Empower Your Cause with Scalable messaging</h1>
            <p className="hero-description">
              Professional messaging tools designed for non-profits to reach their communities effectively. Communicate impact, coordinate volunteers and drive donations
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('REGISTER')}>Get Started Now</button>
              <button className="btn btn-secondary">View Demo</button>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">Why Choose Our Platform</h2>
        <p className="features-subtitle">
          We bridge the gap between techology and social impact with tools built specifically for the non-proft sector.
        </p>
        
        <div className="features-grid">
          <div className="feature-panel">
            <div className="feature-icon">🛡️</div>
            <h3 className="feature-heading">Secure & Reliable</h3>
            <p className="feature-text">
              Enterprise-grade security for sensitive community data and private member communication.
            </p>
          </div>

          <div className="feature-panel">
            <div className="feature-icon">👥</div>
            <h3 className="feature-heading">Scalable Reach</h3>
            <p className="feature-text">
              Broadcast messages to thousands of recipients instantly without technical hurdles or delays.
            </p>
          </div>

          <div className="feature-panel">
            <div className="feature-icon">📊</div>
            <h3 className="feature-heading">Impact Tracking</h3>
            <p className="feature-text">
              Detailed reporting on open rates and click-throughs to measure your campaign's true impact.
            </p>
          </div>
        </div>
        </section>

     <section className="pricing-section">
        <h2 className="pricing-title">Simple, Transparent Pricing</h2>
        <p className="pricing-subtitle">
          Choose the Plan that fits your current needs. Upgrade or downgrade anytime as your mission changes
        </p>

        <div className="pricing-grid">
          <div className="pricing-panel">
            <h3 className="plan-name">Introduction</h3>
            <div className="plan-price">$0<span className="price-period">/mo</span></div>
            <p className="plan-description">
              Perfect for local grassroots organizations starting their journey
            </p>
            <button className="btn btn-primary pricing-btn" onClick={() => onNavigate && onNavigate('REGISTER')}>Sign Up Free</button>
            <ul className="plan-features">
              <li>100 messages/month</li>
              <li>Community forum support</li>
            </ul>
          </div>

          <div className="pricing-panel pricing-panel-popular">
            <div className="popular-badge">most popular</div>
            <h3 className="plan-name">Community</h3>
            <div className="plan-price">$29<span className="price-period">/mo</span></div>
            <p className="plan-description">
              Scale your impact with advanced automation and priority reach
            </p>
            <button className="btn btn-primary pricing-btn" onClick={() => onNavigate && onNavigate('REGISTER')}>Start Growth Trial</button>
            <ul className="plan-features">
              <li>200 messages/month</li>
              <li>Unlimited email contact</li>
              <li>Automataed workflows</li>
              <li>Community forum support</li>
            </ul>
          </div>

          <div className="pricing-panel">
            <h3 className="plan-name">Growth</h3>
            <div className="plan-price">$49<span className="price-period">/mo</span></div>
            <p className="plan-description">
              Scale your impact with advanced automation and priority reach
            </p>
            <button className="btn btn-primary pricing-btn" onClick={() => onNavigate && onNavigate('REGISTER')}>Start Growth Trial</button>
            <ul className="plan-features">
              <li>200 messages/month</li>
              <li>Unlimited email contact</li>
              <li>Automataed workflows</li>
              <li>Community forum support</li>
            </ul>
          </div>
        </div>
      </section>

       <section className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>

        <div className="faq-container">
          <div className="faq-item">
            <h3 className="faq-question">Can we change plans at any time?</h3>
            <p className="faq-answer">
              Yes, you can upgrade or downgrade between the different tiers instantly from your dashboard. Changes are pro-rated.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Do you offer discounts for small non-profits?</h3>
            <p className="faq-answer">
              Our Introductory tier is completely free forever for small organizations with up to 100 monthly essages.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Is our data secure?</h3>
            <p className="faq-answer">
              We uses AES-256 encryption and follow strict GDPR/CCPA protocols to ensure your community is private information stays safe.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;