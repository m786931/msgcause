import React, { useState } from 'react';
import '../styles/PricingPage.css';

function PricingPage ({ onNavigate }) {
  const [step, setStep] = useState(1);
  
  return (

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
    );
}

export default PricingPage;