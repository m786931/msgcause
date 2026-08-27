function normalizeBaseUrl(value) {
  return value ? value.replace(/\/$/, "") : "";
}

export function getApiBase() {
  const explicitBase = normalizeBaseUrl(import.meta.env.VITE_API_URL);
  if (explicitBase) return explicitBase;

  if (import.meta.env.PROD && typeof window !== "undefined") {
    const { protocol, hostname, port } = window.location;
    if (hostname.startsWith("app.")) {
      const apiHost = `api.${hostname.slice(4)}`;
      return normalizeBaseUrl(`${protocol}//${apiHost}${port ? `:${port}` : ""}`);
    }
    return normalizeBaseUrl(`${protocol}//${hostname}${port ? `:${port}` : ""}`);
  }

  return "";
}
