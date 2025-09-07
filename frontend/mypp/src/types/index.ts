export interface Skill {
  id: number;
  name: string;
  category: string;
  estimated_hours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  due_date: string | null;
  completed: boolean;
}

export interface Subtopic {
  id: number;
  name: string;
  description: string | null;
  skills: Skill[];
}

export interface Topic {
  id: number;
  name: string;
  description: string | null;
  subtopics: Subtopic[];
}

export interface Roadmap {
  id: number;
  title: string;
  description: string | null;
  goal: string | null; // Add goal field
  topics: Topic[];
}

export interface SkillCreatePayload {
  name: string;
  category: string;
  estimated_hours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  due_date: string;
}

export interface RoadmapProgress {
  id: number;
  title: string;
  progress: number;
  total_skills: number;
  completed_skills: number;
}

export interface DashboardStats {
  total_skills: number;
  completed_skills: number;
  pending_skills: number;
  not_started_skills: number;
  progress_percent: number;
}

export interface DashboardData {
  user_id: number;
  username: string;
  roadmaps: RoadmapProgress[];
  dashboard_stats: DashboardStats;
}