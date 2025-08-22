export interface Career {
  id: string;
  title: string;
  description: string;
  category: string;
  average_salary: number;
  skills: string[];
  growth_rate?: number;
}

export interface CareerState {
  careers: Career[];
  currentCareer: Career | null;
  loading: boolean;
  error: string | null;
}