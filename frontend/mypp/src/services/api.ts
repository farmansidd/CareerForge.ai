import axios, { InternalAxiosRequestConfig } from 'axios';
import { LoginCredentials, RegisterData } from '../types/auth';

const API_URL: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Crucial for sending cookies with requests
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get CSRF token from cookies and add to header
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrf_token='))?.split('=')[1];
    if (csrfToken) {
      config.headers.set('X-CSRF-Token', csrfToken);
    }
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (user: RegisterData) => {
  const response = await api.post('/auth/register', user);
  return response.data;
};

export const getRoadmaps = async () => {
  const response = await api.get('/roadmaps');
  return response.data;
};

export const createRoadmap = async (roadmap: { title: string; description: string }) => {
  const response = await api.post('/roadmaps', roadmap);
  return response.data;
};

export const getRoadmap = async (roadmapId: string) => {
  const response = await api.get(`/roadmaps/${roadmapId}`);
  return response.data;
};

export const createSkill = async (roadmapId: string, skill: { name: string; category: string; estimated_hours: number; difficulty: string; due_date: string }) => {
  const response = await api.post(`/roadmaps/${roadmapId}/skills`, skill);
  return response.data;
};

export const updateSkill = async (skillId: string, skill: { name: string; category: string; estimated_hours: number; difficulty: string; due_date: string; completed: boolean }) => {
  const response = await api.put(`/skills/${skillId}`, skill);
  return response.data;
};

export const deleteSkill = async (skillId: string) => {
  const response = await api.delete(`/skills/${skillId}`);
  return response.data;
};

export const updateSkillStatus = async (skillId: number, status: string) => {
  const response = await api.put(`/roadmaps/${skillId}/status`, { status });
  return response.data;
};

export const generateRoadmap = async (goal: string) => {
  const response = await api.post('/roadmaps/generate', { goal });
  return response.data;
};
