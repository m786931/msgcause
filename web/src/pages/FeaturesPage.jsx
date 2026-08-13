import React, { useState } from 'react';
import '../styles/FeaturesPage.css';

function FeaturesPage ({ onNavigate }) {
  const [step, setStep] = useState(1);
  
  return (

    <section className="features-section">
        <h2 className="features-title">Why Choose Our Platform</h2>
        <p className="features-subtitle">
          We bridge the gap between technology and social impact with tools built specifically for the non-profit sector.
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
);
}

export default FeaturesPage;