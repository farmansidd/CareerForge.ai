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
  topics: Topic[];
}

export interface SkillCreatePayload {
  name: string;
  category: string;
  estimated_hours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  due_date: string;
}