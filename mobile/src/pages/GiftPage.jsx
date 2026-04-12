import React, { useState } from "react";
import { ChevronRight, Mail, Phone } from "lucide-react";
import phoneInHand from "../assets/phoneInHand.png";

export default function GiftPage({ onNavigate }) {
  const [tab, setTab] = useState("email");
  const [contact, setContact] = useState("");

  const handleClaim = () => {
    if (contact.trim()) {
      onNavigate && onNavigate("VISITOR_STEP3");
    }
  };

  const handleSkip = () => {
    onNavigate && onNavigate("VISITOR_STEP3");
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white px-6 pt-10 pb-6">

      {/* Label + progress bars */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">
          Visitor Check-In
        </p>
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-green-500" />
          <div className="h-1 flex-1 rounded-full bg-green-500" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Image with overlaid text */}
      <div className="relative w-full mb-3 rounded-2xl overflow-hidden">
        <img
          src={phoneInHand}
          alt="Gift"
          className="w-full h-52 object-cover"
        />
        {/* dark gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl" />

        {/* "Choose your gift" — top left */}
        <p className="absolute top-3 left-4 text-xs font-semibold text-white/80 tracking-widest uppercase">
          Choose your gift
        </p>

        {/* "Welcome Home!" + body copy — bottom left */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white leading-tight mb-1">
            Welcome Home!
          </h2>
          <p className="text-sm text-white/80 leading-snug">
            We are so glad you joined us today. To say thank you, we'd love to send you{" "}
            <span className="italic opacity-75">[gift details coming soon]</span>.
          </p>
        </div>
      </div>

      {/* Gift delivery box */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-4 pt-4 pb-4 mb-3">
        <p className="text-sm font-bold text-gray-900 mb-4">
          Where should we send it?
        </p>

        {/* Tab bar */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-4">
          <button
            onClick={() => { setTab("email"); setContact(""); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold transition-colors ${
              tab === "email"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-500"
            }`}
          >
            <Mail size={15} />
            Email
          </button>
          <button
            onClick={() => { setTab("phone"); setContact(""); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold transition-colors ${
              tab === "phone"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-500"
            }`}
          >
            <Phone size={15} />
            Phone
          </button>
        </div>

        {/* Input */}
        {tab === "email" ? (
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={17}
            />
            <input
              type="email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="you@email.com"
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        ) : (
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={17}
            />
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mb-4">
        <button
          onClick={handleClaim}
          className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-lg font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          Claim Gift
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
        <button
          onClick={handleSkip}
          className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-400 text-base font-medium py-3.5 rounded-2xl transition-colors"
        >
          No thanks, I just want to submit my info
        </button>
      </div>

      {/* Privacy note + link */}
      <p className="text-xs text-gray-400 text-center mb-2">
        We respect your privacy. No spam, we promise.
      </p>
      <a
        href="/privacy"
        className="text-xs text-gray-400 text-center underline block"
      >
        Privacy Policy
      </a>

    </div>
  );
}