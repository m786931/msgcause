import React, { useState } from 'react';
import '../styles/MemberLoginPage.css';

export default function MemberLoginPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-card-title">Welcome Back</h1>
        <p className="login-card-subtitle">Please enter your details to sign in</p>

        <form className="login-fields" onSubmit={handleSubmit}>

          {/* Email field */}
          <div className="login-field">
            <label className="login-label" htmlFor="login-email">Email Address</label>
            <div className="login-input-wrapper">
              <span className="login-input-icon">✉️</span>
              <input
                id="login-email"
                type="email"
                className="login-input"
                placeholder="name@ministry.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="login-field">
            <div className="login-label-row">
              <label className="login-label" htmlFor="login-password">Password</label>
              <a href="#" className="login-forgot" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
            </div>
            <div className="login-input-wrapper">
              <span className="login-input-icon">🔒</span>
              <input
                id="login-password"
                type="password"
                className="login-input"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Remember me */}
          <div className="login-remember">
            <input
              id="login-remember"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="login-remember" className="login-remember-label">
              Remember me for 30 days
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="login-btn">Login</button>

        </form>
      </div>

      {/* SSL badge */}
      <div className="login-ssl">
        <span className="login-ssl-icon">🛡️</span>
        <span>Secure 256-bit SSL encrypted connection</span>
      </div>
    </div>
  );
}
