// API Configuration
// Prefer an explicit environment variable, otherwise use the deployed host in production.
const API_BASE_URL = process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:4000');

export default API_BASE_URL;
