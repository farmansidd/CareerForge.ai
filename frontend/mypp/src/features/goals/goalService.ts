import axios from 'axios';
import { Goal, GoalFormData } from './goalTypes';

const API_URL = '/goals/';

// Create new goal
export const createGoal = async (goalData: GoalFormData): Promise<Goal> => {
  const response = await axios.post(API_URL, goalData);
  return response.data;
};

// Get all goals
export const fetchGoals = async (): Promise<Goal[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Update goal
export const updateGoal = async (id: string, goalData: Partial<GoalFormData>): Promise<Goal> => {
  const response = await axios.patch(`${API_URL}${id}`, goalData);
  return response.data;
};

// Delete goal
export const deleteGoal = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}${id}`);
};

// Update goal status
export const updateGoalStatus = async (id: string, status: Goal['status']): Promise<Goal> => {
  const response = await axios.patch(`${API_URL}${id}/status`, { status });
  return response.data;
};