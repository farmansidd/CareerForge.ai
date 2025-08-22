export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
}

export interface AIState {
  messages: AIMessage[];
  loading: boolean;
  error: string | null;
  active: boolean;
}

export interface ResumeData {
  id: string;
  title: string;
  content: string;
  template: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeState {
  resumes: ResumeData[];
  currentResume: ResumeData | null;
  loading: boolean;
  error: string | null;
}

export interface SkillGapData {
  userSkills: Record<string, number>;
  careerOptions: CareerOption[];
  requirements: Record<string, Record<string, number>>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface CareerOption {
  id: string;
  title: string;
  description: string;
  requirements: Record<string, number>;
}

export interface SkillGapAnalysis {
  careerId: string;
  careerTitle: string;
  gapScore: number;
  skillGaps: Array<{
    skill: string;
    userLevel: number;
    requiredLevel: number;
    gap: number;
    priority: 'high' | 'medium' | 'low';
  }>;
  recommendations: string[];
}
