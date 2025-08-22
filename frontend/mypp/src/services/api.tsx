// src/services/api.ts
import axios, { InternalAxiosRequestConfig } from 'axios';

// CRA-compatible env var
const baseURL: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Crucial for sending cookies with requests
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get CSRF token from cookies and add to header
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrf_token='))?.split('=')[1];
    if (csrfToken) {
      config.headers.set('X-CSRF-Token', csrfToken);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default  axiosInstance;