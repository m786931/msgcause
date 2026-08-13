const CONNECT_FLOW_KEY = "connectFlow";
const VISITOR_KEY = "mc_visitor";

export function saveConnectFlow(data) {
  try {
    sessionStorage.setItem(CONNECT_FLOW_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save connect flow:", err);
  }
}

export function loadConnectFlow() {
  try {
    const raw = sessionStorage.getItem(CONNECT_FLOW_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Failed to load connect flow:", err);
    return null;
  }
}

export function clearConnectFlow() {
  try {
    sessionStorage.removeItem(CONNECT_FLOW_KEY);
  } catch (err) {
    console.error("Failed to clear connect flow:", err);
  }
}

function generateId() {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `v_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
}

export function saveVisitor({ visitorId, firstName, lastName }) {
  try {
    const payload = {
      visitorId,
      firstName: firstName || "",
      lastName: lastName || "",
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(VISITOR_KEY, JSON.stringify(payload));
    return payload;
  } catch (err) {
    console.error("Failed to save visitor:", err);
    return null;
  }
}

export function getVisitor() {
  try {
    const raw = localStorage.getItem(VISITOR_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Failed to load visitor:", err);
    return null;
  }
}

export function ensureVisitor({ firstName, lastName }) {
  try {
    const existing = getVisitor();
    if (existing && existing.visitorId) return existing;
    const id = generateId();
    return saveVisitor({ visitorId: id, firstName, lastName });
  } catch (err) {
    console.error("Failed to ensure visitor:", err);
    return null;
  }
}

const apiBase = import.meta.env.PROD
  ? (import.meta.env.VITE_API_URL || "")
  : "";

/**
 * POST attendance to the server for a given guid + visitor.
 * Returns the server response, or null on failure.
 * Safe to call multiple times in the same week (server upserts).
 */
export async function addAttendance(guid, { visitorKey, firstName, lastName } = {}) {
  try {
    if (!guid || !visitorKey) return null;
    const res = await fetch(`${apiBase}/connect/${guid}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorKey, firstName, lastName }),
    });
    if (!res.ok) {
      console.warn("Attendance POST returned", res.status);
      return null;
    }
    return res.json();
  } catch (err) {
    console.error("Failed to record attendance on server:", err);
    return null;
  }
}