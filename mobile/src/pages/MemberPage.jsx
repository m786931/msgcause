import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadConnectFlow, saveConnectFlow } from "../utils/connectFlowStorage";
import { Check } from "lucide-react";
import phoneInHand from "../assets/phoneInHand.png";

export default function MemberPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const flowData = location.state || loadConnectFlow();
  const [prayerRequest, setPrayerRequest] = useState(flowData?.prayerRequest || "");

  useEffect(() => {
    if (location.state) {
      saveConnectFlow(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    if (!flowData) {
      navigate("/", { replace: true });
    }
  }, [flowData, navigate]);

  if (!flowData) return null;

  const handleSubmit = () => {
    const payload = {
      ...flowData,
      prayerRequest: prayerRequest.trim(),
    };

    saveConnectFlow(payload);
    navigate("/thank-you", { state: payload, replace: true });
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white px-6 pt-10 pb-6">
      <div className="mb-6">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">
          Visitor Check-In
        </p>
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-green-500" />
          <div className="h-1 flex-1 rounded-full bg-green-500" />
          <div className="h-1 flex-1 rounded-full bg-green-500" />
          <div className="h-1 flex-1 rounded-full bg-green-500" />
        </div>
      </div>

      <h1>Gift Page</h1>
      <p>Welcome, {flowData.firstName}</p>
      <p>Ministry: {flowData.ministryName}</p>

      <div className="relative w-full mb-3 rounded-2xl overflow-hidden">
        <img src={phoneInHand} alt="Gift" className="w-full h-52 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl" />
        <p className="absolute top-3 left-4 text-xs font-semibold text-white/80 tracking-widest uppercase">
          Choose your gift
        </p>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white leading-tight mb-1">
            Welcome Home!
          </h2>
          <p className="text-sm text-white/80 leading-snug">
            Tell us how we can pray for you or support you this week
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-4 pt-4 pb-4 mb-3">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Prayer Request/Question
        </label>
        <textarea
          value={prayerRequest}
          onChange={(e) => setPrayerRequest(e.target.value)}
          rows={6}
          placeholder="Share your prayer request or question..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-lg font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          Finish &amp; Submit
          <Check size={22} strokeWidth={2.5} />
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center mb-2">
        We respect your privacy. No spam, we promise.
      </p>
      <a href="/privacy" className="text-xs text-gray-400 text-center underline block">
        Privacy Policy
      </a>
    </div>
  );
}