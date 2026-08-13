import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { saveConnectFlow, getVisitor, ensureVisitor, addAttendance } from "../utils/connectFlowStorage";

const apiBase = import.meta.env.PROD ? (import.meta.env.VITE_API_URL || "") : "";


export default function VisitorPage({ onNavigate }) {
  const { guid } = useParams();
  const navigate = useNavigate();
  console.log("VisitorPage rendered, guid =", guid);
  const [ministryName, setMinistryName] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "" });
  const [visitedBefore, setVisitedBefore] = useState(false);

useEffect(() => {
  console.log("useEffect fired, guid =", guid);

  const fetchMinistryInfo = async () => {
    try {
      if (!guid) {
        console.warn("No guid in route params. Skipping fetch.");
        return;
      }

      const requestUrl = `${apiBase}/connect/${guid}`;

      console.log("Fetching from:", requestUrl);
      const response = await fetch(requestUrl);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      console.log("connect response:", data);

      if (data.valid) {
        setMinistryName(data.ministryName ?? data.name ?? "your ministry");
      }
    } catch (error) {
      console.error("Error fetching ministry info:", error);
    }
  };

  fetchMinistryInfo();
}, [guid]);

useEffect(() => {
  const checkStoredVisitor = async () => {
    try {
      const stored = getVisitor();
      if (stored && stored.visitorId) {
        setForm((f) => ({
          ...f,
          firstName: stored.firstName || f.firstName,
          lastName: stored.lastName || f.lastName,
        }));
        setVisitedBefore(true);
        // Record attendance on the server for returning visitors (weekly)
        if (guid) {
          await addAttendance(guid, {
            visitorKey: stored.visitorId,
            firstName: stored.firstName,
            lastName: stored.lastName,
          });
        }
        // keep connect flow in session so downstream pages can use it
        const payload = { guid, firstName: stored.firstName || "", lastName: stored.lastName || "", visitorId: stored.visitorId };
        saveConnectFlow(payload);
      }
    } catch (err) {
      console.error("Error checking stored visitor:", err);
    }
  };
  checkStoredVisitor();
}, [guid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleNext = () => {
    if (form.firstName.trim()) {
      const createAndContinue = async () => {
        // ensure we have a persistent visitor id for future visits
        try {
          const visitor = await ensureVisitor({ firstName: form.firstName.trim(), lastName: form.lastName.trim() });
          const payload = { guid, ...form, ministryName, visitorId: visitor?.visitorId };
          saveConnectFlow(payload);
          // record attendance on the server for this visit
          if (visitor?.visitorId && guid) {
            await addAttendance(guid, {
              visitorKey: visitor.visitorId,
              firstName: form.firstName.trim(),
              lastName: form.lastName.trim(),
            });
          }
          navigate("/digital-connect", { state: payload });
        } catch (err) {
          console.error("Failed to create visitor and continue:", err);
          const payload = { guid, ...form, ministryName };
          saveConnectFlow(payload);
          navigate("/digital-connect", { state: payload });
        }
      };

      createAndContinue();
    }
  };
  console.log("ministryName state =", ministryName);

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
        <p className="text-sm text-red-500">debug ministryName: {String(ministryName)}</p>

        <h1 className="text-4xl font-bold text-gray-900 text-left leading-tight mb-1">
          Welcome to {ministryName || "..."}!
        </h1>
        <p className="text-2xl text-gray-400 text-left leading-snug mb-4">
          We're so glad you joined us today.
        </p>
        <p className="text-base text-gray-900 text-left">
          What's your name?
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