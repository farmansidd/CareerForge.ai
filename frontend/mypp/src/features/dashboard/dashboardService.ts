import { api } from '../../services/api'; // Import the configured axios instance
import { CareerGoal } from './types';

const API_URL = '/dashboard'; // Base URL is already handled by the api instance

const getDashboardStats = async () => {
  const response = await api.get(API_URL + '/stats');
  return response.data;
};

const getGoals = async (params: any) => {
    const response = await api.get(API_URL + '/goals', { params });
    return response.data;
};

const getSkills = async (params: any) => {
    const response = await api.get(API_URL + '/skills', { params });
    return response.data;
};

const createGoal = async (goalData: Omit<CareerGoal, 'id' | 'createdAt' | 'updatedAt' | 'progress' | 'steps'>) => {
  const response = await api.post(API_URL + '/goals', goalData);
  return response.data;
};

const getAIRecommendations = async () => {
  const response = await api.get(API_URL + '/recommendations');
  return response.data;
};

const getUserDashboard = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

const dashboardService = {
  getDashboardStats,
  getGoals,
  getSkills,
  createGoal,
  getAIRecommendations,
  getUserDashboard,
};

export default dashboardService;