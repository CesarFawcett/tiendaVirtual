import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (userStr) {
    try {
      const { token } = JSON.parse(userStr);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Auth token parse error", e);
    }
  }
  return config;
});

export default api;
