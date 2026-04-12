import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function VisitorPage({ onNavigate }) {
  const [form, setForm] = useState({ firstName: "", lastName: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleNext = () => {
    if (form.firstName.trim()) {
      onNavigate && onNavigate("GIFT");
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white px-6 pt-10 pb-6">

      {/* Label + progress bars */}
      <div className="mb-8">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">
          Visitor Check-In
        </p>
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-green-500" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Welcome copy */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 text-left leading-tight mb-1">
          Welcome!
        </h1>
        <p className="text-2xl text-gray-400 text-left leading-snug mb-4">
          We're glad you're here
        </p>
        <p className="text-base text-gray-900 text-left">
          Please share your name so we can connect with you and prepare your gift.
        </p>
      </div>

      {/* Name fields */}
      <div className="flex flex-col gap-5 flex-1">
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="John"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Smith"
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* CTA + footer note */}
      <div className="mt-8">
        <button
          onClick={handleNext}
          className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-lg font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          Next Step
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
        <p className="text-xs text-gray-400 text-center mt-4 tracking-wide">
          STEP 1 of 4 &bull; SECURE &amp; PRIVATE
        </p>
      </div>

    </div>
  );
}