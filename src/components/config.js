const isLocalhost = Boolean(
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
   window.location.hostname === "127.0.0.1" ||
   window.location.hostname === "[::1]")
);

export const base_url = isLocalhost
  ? (process.env.REACT_APP_LOCAL_API_URL || "http://localhost:8000/api")
  : (process.env.REACT_APP_API_BASE_URL || "https://qualcare.smmtechnologies.com/api");