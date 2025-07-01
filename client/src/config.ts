// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mbmp-api.onrender.com' // Will deploy backend here
  : '';

export { API_BASE_URL };
