import React from 'react';
import '../styles/AboutPage.css';
import officePhones from '../assets/OfficePhones.png';

function AboutPage({ onNavigate }) {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-text">
          <h1 className="about-hero-heading">
            Professional Networking
            <span className="about-hero-heading-accent">Reimagined.</span>
          </h1>
          <p className="about-hero-body">
            At ConnectCards, we are bridging the gap between traditional networking and the digital age.
            We believe the first impression shouldn't end with a piece of paper, but begin with a dynamic digital connection.
          </p>
        </div>
        <img
          src={officePhones}
          alt="Office professionals using phones"
          className="about-hero-image"
        />
      </div>

      {/* Why Section */}
      <div className="about-why">
        <div className="about-why-inner">
          <h2 className="about-why-title">Why choose ConnectCards?</h2>
          <p className="about-why-subtitle">
            Designed for the high-trust requirements of modern ministries
          </p>

          <div className="about-cards">
            <div className="about-card">
              <h3 className="about-card-heading">Peak Efficiency</h3>
              <p className="about-card-body">
                Instant exchange with QR technology. No more typing manually or losing loose cards in your pocket or on your desk.
              </p>
            </div>

            <div className="about-card about-card-middle">
              <h3 className="about-card-heading">Unmatched Ease</h3>
              <p className="about-card-body">
                Update your details in real-time. Your connections are stored and a contact plan applied immediately.
              </p>
            </div>

            <div className="about-card">
              <h3 className="about-card-heading">Modern Identity</h3>
              <p className="about-card-body">
                A digital presence that mirrors your professional communication. Beautiful, accessible, and efficient.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AboutPage;
