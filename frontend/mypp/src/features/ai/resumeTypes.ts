export interface ResumeSection {
  id: string;
  type: 'summary' | 'experience' | 'education' | 'skills';
  content: string;
}

export interface ResumeState {
  sections: ResumeSection[];
  generatedContent: string;
  loading: boolean;
  error: string | null;
  template: 'modern' | 'professional' | 'creative';
}