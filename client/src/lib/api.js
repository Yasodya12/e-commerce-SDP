// Centralized API configuration for deployment flexibility.
// In development: defaults to http://localhost:5000
// In production:  set VITE_API_URL in client/.env to your deployed backend URL.
export const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";
