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