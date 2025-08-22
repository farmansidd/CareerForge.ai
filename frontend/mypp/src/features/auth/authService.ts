import axios from 'axios';
import { AuthResponse, Credentials, RegisterData } from './authTypes';
import { api } from '../../services/api'; // Use the configured axios instance

const API_URL = '/'; 

// Register user
const register = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post(API_URL + 'register', userData);
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Assuming user data is also returned
    }
    return response.data;
};

// Login user
const login = async (credentials: Credentials): Promise<AuthResponse> => {
  const formData = new URLSearchParams();
  formData.append('username', credentials.email); // Using email as username
  formData.append('password', credentials.password);

    const response = await api.post(API_URL + 'login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
    // Optionally store user data if returned by the backend login endpoint
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Uncommented and added
  }
  return response.data;
};

// Logout user
const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user data if stored
};

const authService = {
  register,
  login,
  logout,
};

export default authService;