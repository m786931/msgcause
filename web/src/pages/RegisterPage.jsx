import React, { useState } from "react";
import { Church, Contact, Mail, Phone, User } from "lucide-react";
import "../styles/RegisterPage.css";

export default function RegisterPage({ onNavigate }) {
  const [status, setStatus] = useState(null);
  const initialForm = {
    orgName: "",
    contact: "",
    email: "",
    phone: "",
    ein: "",
    agree: false,
  };
  const [form, setForm] = useState({
    ...initialForm,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", form);
    setStatus("saving");
    // TODO: Add validation and submit logic
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      const saved = await res.json();
      console.log("Saved:", saved);
      setForm(initialForm);       // clear the form
      setStatus("success");       // show the success message
      setTimeout(() => onNavigate && onNavigate("REGISTERED"), 2000); // navigate after 2s
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-image-container bg-[url('https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800')]">
          <div className="register-overlay">
            <h1 className="register-overlay-title">Empower Your Mission</h1>
            <p className="register-overlay-desc">
              Join other non-profits reaching their communities through better messaging. Start your 14-day free trial today.
            </p>
            <ul className="register-overlay-features">
              <li>99.9% Messaging uptime</li>
              <li>Dedicated Support Team</li>
              <li>No Credit Card Required</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="register-right">
        <h2 className="register-right-title">Register Your Organization</h2>
        <p className="register-right-desc">
          Create your workspace and start connecting with your community in
          minutes.
        </p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row full-width">
            <label htmlFor="orgName" className="form-label">
              Organization / Ministry Name
            </label>
            <div className="relative w-full">
              <Church
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={18}
              />
              <input
                type="text"
                id="orgName"
                name="orgName"
                placeholder="e.g. City Hope Church"
                value={form.orgName}
                onChange={handleChange}
                required
                className="form-input w-full pl-25 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
          <div className="form-row full-width">
            <label htmlFor="contact" className="form-label">
              Contact Person Name
            </label>
            <div className="relative w-full">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={18}
              />
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter full name of primary contact"
                value={form.contact}
                onChange={handleChange}
                required
                className="form-input w-full pl-25 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
          <div className="form-row grid-cols-2 flex gap-4">
            <div className="w-100%">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative w-full">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={18}
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="admin@example.org"
                value={form.email}
                onChange={handleChange}
                required
                className="form-input w-full pl-25 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              </div>
            </div>
            <div className="w-100%">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <div className="relative w-full">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={18}
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (202) 555-0100"
                value={form.phone}
                onChange={handleChange}
                required
                className="form-input w-full pl-25 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              </div>
            </div>
          </div>
          <div className="form-row full-width">
            <label htmlFor="ein" className="form-label">
              EIN / Tax ID
              <span className="form-optional">Optional</span>
            </label>
            <div className="relative w-full">
              <Contact
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={18}
              />
              <input
                type="text"
                id="ein"
                name="ein"
                placeholder="00-0000000"
                value={form.ein}
                onChange={handleChange}
                className="form-input w-full pl-25 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
          <div className="form-row checkbox-row">
            <label className="form-checkbox-label text-slate-400">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                required
              />
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>
          <button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Saving..." : "Submit"}
          </button>
          <div className="form-login-link">
            Already have an account?{" "}
            <a
              href="#login"
              className="login-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate && onNavigate("LOGIN");
              }}
            >
              <b>Log In</b>
            </a>
          </div>
          {status === "success" && <p>Saved successfully!</p>}
          {status === "error" && <p>Something went wrong.</p>}
        </form>
      </div>
    </div>
  );
}
