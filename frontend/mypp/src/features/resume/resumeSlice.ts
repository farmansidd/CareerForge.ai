import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeState, PersonalInfo, Experience, Education, Project, Certification } from './resumeTypes';

const initialState: ResumeState = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '123-456-7890',
    linkedin: 'linkedin.com/in/yourname',
    github: 'github.com/yourname',
  },
  summary: 'A brief summary about you.',
  experience: [],
  education: [],
  skills: ['React', 'TypeScript', 'Node.js'],
  projects: [],
  certifications: [],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Personal Info
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    // Summary
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },
    // Experience
    addExperience: (state) => {
      state.experience.push({
        id: Date.now().toString(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    },
    updateExperience: (state, action: PayloadAction<{ id: string; data: Partial<Experience> }>) => {
      const index = state.experience.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.experience[index] = { ...state.experience[index], ...action.payload.data };
      }
    },
    removeExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter(exp => exp.id !== action.payload);
    },
    // Education
    addEducation: (state) => {
      state.education.push({
        id: Date.now().toString(),
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
      });
    },
    updateEducation: (state, action: PayloadAction<{ id: string; data: Partial<Education> }>) => {
      const index = state.education.findIndex(edu => edu.id === action.payload.id);
      if (index !== -1) {
        state.education[index] = { ...state.education[index], ...action.payload.data };
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(edu => edu.id !== action.payload);
    },
    // Skills
    addSkill: (state, action: PayloadAction<string>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<{ index: number; value: string }>) => {
      if (state.skills[action.payload.index]) {
        state.skills[action.payload.index] = action.payload.value;
      }
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills.splice(action.payload, 1);
    },
    // Projects
    addProject: (state) => {
      state.projects.push({
        id: Date.now().toString(),
        name: '',
        description: '',
        technologies: [],
        url: '',
      });
    },
    updateProject: (state, action: PayloadAction<{ id: string; data: Partial<Project> }>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload.data };
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    // Certifications
    addCertification: (state) => {
      state.certifications.push({
        id: Date.now().toString(),
        name: '',
        issuer: '',
        date: '',
        url: '',
      });
    },
    updateCertification: (state, action: PayloadAction<{ id: string; data: Partial<Certification> }>) => {
      const index = state.certifications.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.certifications[index] = { ...state.certifications[index], ...action.payload.data };
      }
    },
    removeCertification: (state, action: PayloadAction<string>) => {
      state.certifications = state.certifications.filter(c => c.id !== action.payload);
    },
  },
});

export const {
  updatePersonalInfo,
  updateSummary,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
} = resumeSlice.actions;

export default resumeSlice.reducer;