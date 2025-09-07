import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_email_verified: boolean;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  accessToken: string | null;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:8000/api/v1'; // Assuming your backend runs on this URL

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(localStorage.getItem('refreshToken'));
  const navigate = useNavigate();

  // Use useRef to hold the latest refreshTokenValue
  const refreshTokenRef = useRef(refreshTokenValue);
  useEffect(() => {
    refreshTokenRef.current = refreshTokenValue;
  }, [refreshTokenValue]);

  console.log("AuthProvider initialized. accessToken:", accessToken, "refreshTokenValue:", refreshTokenValue);

  const fetchUser = useCallback(async (token: string) => {
    console.log("fetchUser called with token:", token);
    try {
      const response = await axiosInstance.get(`/auth/me`);
      setUser(response.data);
      console.log("fetchUser successful. User:", response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
      setAccessToken(null);
      setRefreshTokenValue(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (refreshTokenRef.current) {
        await axiosInstance.post(`/auth/logout`, null, {
          headers: {
            Authorization: `Bearer ${refreshTokenRef.current}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshTokenValue(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    }
  }, [navigate]);

  const refreshToken = useCallback(async () => {
    setLoading(true);
    console.log("refreshToken called. refreshTokenValue (from ref):", refreshTokenRef.current);
    try {
      if (!refreshTokenRef.current) {
        throw new Error("No refresh token available");
      }
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, null, {
        headers: {
          Authorization: `Bearer ${refreshTokenRef.current}`,
        },
      });
      const { access_token } = response.data;
      console.log("refreshToken successful. New access_token:", access_token);
      setAccessToken(access_token);
      localStorage.setItem('accessToken', access_token);
      await fetchUser(access_token);
    } catch (error) {
      console.error('Refresh token failed:', error);
      setUser(null);
      setAccessToken(null);
      setRefreshTokenValue(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw error; // Re-throw the error to be caught by the caller
    } finally {
      setLoading(false);
    }
  }, [fetchUser]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`,
        new URLSearchParams({ username: email, password: password }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      const { access_token, refresh_token } = response.data;
      console.log("Login successful. access_token:", access_token, "refresh_token:", refresh_token);
      setAccessToken(access_token);
      setRefreshTokenValue(refresh_token);
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      await fetchUser(access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchUser, navigate]);

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, { username, email, password });
      const { access_token, refresh_token, user } = response.data;
      console.log("Register successful. access_token:", access_token, "refresh_token:", refresh_token);
      setAccessToken(access_token);
      setRefreshTokenValue(refresh_token);
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, [navigate]);

  // Axios Interceptor to attach access token
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        // If the error is 401 and it's not the login or refresh endpoint, try to refresh the token
        if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login' && originalRequest.url !== '/auth/refresh') {
          originalRequest._retry = true;
          try {
            // Use the ref to get the latest refresh token
            if (!refreshTokenRef.current) {
              throw new Error("No refresh token available for interceptor");
            }
            const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, null, {
              headers: {
                Authorization: `Bearer ${refreshTokenRef.current}`,
              },
            });
            const newAccessToken = refreshResponse.data.access_token;
            setAccessToken(newAccessToken);
            localStorage.setItem('accessToken', newAccessToken);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error('Auto-refresh failed in interceptor, logging out:', refreshError);
            logout(); // Call logout to clear tokens and navigate to login
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, logout]); // Removed refreshToken from dependencies, as it's accessed via ref

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (accessToken) {
          await fetchUser(accessToken);
          setLoading(false);
        } else if (refreshTokenValue) {
          await refreshToken();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("No active session or refresh token failed");
        setLoading(false);
      }
    };
    initializeAuth();
  }, [fetchUser, refreshToken, accessToken, refreshTokenValue]);

  const value = {
    user,
    loading,
    login,
    logout,
    refreshToken,
    accessToken,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
