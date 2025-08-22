import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ResumeSection, ResumeState } from './resumeTypes';

const initialState: ResumeState = {
  sections: [],
  generatedContent: '',
  loading: false,
  error: null,
  template: 'professional',
};

export const generateResumeContent = createAsyncThunk(
  'resume/generate',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any;
      const response = await axios.post('/ai/resume', {
        sections: state.aiResume.sections,
        template: state.aiResume.template,
      });
      return response.data.content;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to generate resume');
      }
      return rejectWithValue('Failed to generate resume');
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<ResumeSection>) => {
      state.sections.push(action.payload);
    },
    updateSection: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const section = state.sections.find((s) => s.id === action.payload.id);
      if (section) {
        section.content = action.payload.content;
      }
    },
    removeSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter((s) => s.id !== action.payload);
    },
    setTemplate: (state, action: PayloadAction<'modern' | 'professional' | 'creative'>) => {
      state.template = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateResumeContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateResumeContent.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.generatedContent = action.payload;
      })
      .addCase(generateResumeContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addSection, updateSection, removeSection, setTemplate } = resumeSlice.actions;
export default resumeSlice.reducer;