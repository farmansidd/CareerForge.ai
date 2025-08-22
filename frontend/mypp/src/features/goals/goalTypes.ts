export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface GoalFormData {
  title: string;
  description: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

export interface GoalState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  success: boolean;
}