import axios from 'axios';
import { Career } from './careerTypes';

const API_URL = '/careers/';

// Fetch all careers
export const fetchCareers = async (): Promise<Career[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch single career by ID
export const fetchCareerById = async (id: string): Promise<Career> => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

// Search careers by query
export const searchCareers = async (query: string): Promise<Career[]> => {
  const response = await axios.get(`${API_URL}search?q=${query}`);
  return response.data;
};

// Get recommended careers based on skills
export const getRecommendedCareers = async (skills: string[]): Promise<Career[]> => {
  const response = await axios.post(`${API_URL}recommendations`, { skills });
  return response.data;
};

export default {
  fetchCareers,
  fetchCareerById,
  searchCareers,
  getRecommendedCareers,
};
