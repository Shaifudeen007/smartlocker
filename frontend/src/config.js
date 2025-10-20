// frontend/src/config.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://smartlocker-6tj0.onrender.com'
  : 'http://localhost:8000';

export default API_BASE_URL;