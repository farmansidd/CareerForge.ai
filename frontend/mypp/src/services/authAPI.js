// src/services/authAPI.js
import axiosInstance from './api';

export const loginUser = async (payload) => {
  const params = new URLSearchParams();
  params.append('username', payload.username);
  params.append('password', payload.password);

  const response = await axiosInstance.post('/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data; // { access_token, token_type }
};

export const registerUser = async (payload) => {
  const response = await axiosInstance.post('/register', payload);
  return response.data;
};
