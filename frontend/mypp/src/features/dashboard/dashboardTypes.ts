export interface DashboardStats {
  total_goals: number;
  goals_completed: number;
  skills_acquired: number;
  pending_tasks: number;
  career_readiness: number;
  active_days: number;
  learning_streak: number;
  recent_activity: Array<{
    type: 'activity' | 'goal' | 'skill'; // Added 'skill' type for completeness
    description: string;
    timestamp: string;
  }>;
}

export interface GoalStep {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  dueDate: string; // ISO date string
  aiSuggested: boolean;
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string; // ISO date string
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  progress: number; // 0-100
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  steps: GoalStep[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  mastery: number; // 0-100
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIRecommendation {
  id: string;
  type: 'course' | 'skill' | 'project';
  title: string;
  description: string;
  relevance: number; // 0-100
  actionUrl: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// This DashboardState matches the one used in dashboardSlice.ts
export interface DashboardState {
  stats: DashboardStats | null;
  goals: CareerGoal[];
  skills: Skill[];
  recommendations: AIRecommendation[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}