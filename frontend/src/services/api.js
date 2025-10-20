 import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
};

// Lockers API
export const lockersAPI = {
  getAll: () => api.get('/lockers/'),
  getAvailable: () => api.get('/lockers/available/'),
};

// Reservations API
export const reservationsAPI = {
  getAll: () => api.get('/reservations/'),
  create: (data) => api.post('/reservations/', data),
  release: (id) => api.put(`/reservations/${id}/release/`),
};