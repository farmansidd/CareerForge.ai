// From dashboardTypes.ts
export interface DashboardStats {
  total_goals: number;
  goals_completed: number;
  skills_acquired: number;
  pending_tasks: number;
  career_readiness: number;
  active_days: number;
  learning_streak: number;
  recent_activity: Array<{
    type: 'activity' | 'goal';
    description: string;
    timestamp: string;
  }>;
}
export interface ProgressData {
  skill: string;
  current_level: number;
  target_level: number;
}

export interface RecentActivity {
  id: string;
  type: 'course' | 'project' | 'goal';
  title: string;
  date: string;
  completed: boolean;
}

// From types.ts
// Career Goal Types
export interface GoalStep {
  id: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  dueDate?: string;
  aiSuggested?: boolean; // To mark if it's AI-generated
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  progress: number;
  createdAt: string;
  updatedAt: string;
  steps?: GoalStep[];
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  mastery: number; // 0-100
  description?: string;
  certifications: string[];
  projects: string[];
  createdAt: string;
  updatedAt: string;
}

// AI Recommendation Types
export interface AIRecommendation {
  id:string;
  type: 'course' | 'certification' | 'job_role' | 'skill';
  title: string;
  description: string;
  relevance: number; // 0-100
  actionUrl?: string;
  estimatedTime?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'pending' | 'accepted' | 'ignored' | 'completed';
  createdAt: string;
}

// Report Types
export interface ProgressReport {
  id: string;
  title: string;
  type: 'pdf' | 'csv';
  generatedAt: string;
  data: {
    goals: CareerGoal[];
    skills: Skill[];
    recommendations: AIRecommendation[];
  };
}

// Chart Data Types
export interface SkillGrowthData {
  date: string;
  skill: string;
  level: number;
}

export interface SkillLevelData {
  level: string;
  count: number;
  percentage: number;
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  isVerified: boolean;
  createdAt: string;
  lastLogin: string;
  goalsCount: number;
  skillsCount: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Error Types
export interface DashboardError {
  type: 'network' | 'validation' | 'server';
  message: string;
  details?: any;
}

// Filter Types
export interface FilterOptions {
  status?: string;
  priority?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
  sortBy?: 'date' | 'priority' | 'status' | 'progress';
  sortOrder?: 'asc' | 'desc';
}

// Modal Types
export interface ModalState {
  type: 'goal' | 'skill' | 'report' | null;
  mode: 'add' | 'edit' | 'view';
  data?: any;
  isOpen: boolean;
}