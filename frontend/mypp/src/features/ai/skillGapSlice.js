import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchUserSkills = createAsyncThunk(
  'skillGap/fetchUserSkills',
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await api.get('/skills/user', {
      headers: {
        Authorization: `Bearer ${auth.user?.token || ''}`
      }
    });
    return response.data;
  }
);

export const fetchCareerRequirements = createAsyncThunk(
  'skillGap/fetchCareerRequirements',
  async () => {
    const response = await api.get('/careers/requirements');
    return response.data;
  }
);

export const analyzeSkillGap = createAsyncThunk(
  'skillGap/analyzeSkillGap',
  async ({ careerId, userSkills }, { getState }) => {
    const { auth } = getState();
    const response = await api.post('/ai/analyze-skill-gap', {
      careerId,
      userSkills
    }, {
      headers: {
        Authorization: `Bearer ${auth.user?.token || ''}`
      }
    });
    return response.data;
  }
);

const skillGapSlice = createSlice({
  name: 'skillGap',
  initialState: {
    userSkills: {},
    careerOptions: [],
    requirements: {},
    analysis: null,
    status: 'idle',
    error: null
  },
  reducers: {
    clearAnalysis: (state) => {
      state.analysis = null;
    },
    updateUserSkill: (state, action) => {
      const { skill, level } = action.payload;
      state.userSkills[skill] = level;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userSkills = action.payload;
      })
      .addCase(fetchUserSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCareerRequirements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCareerRequirements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.careerOptions = action.payload.careers || [];
        state.requirements = action.payload.requirements || {};
      })
      .addCase(fetchCareerRequirements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(analyzeSkillGap.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(analyzeSkillGap.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.analysis = action.payload;
      })
      .addCase(analyzeSkillGap.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearAnalysis, updateUserSkill } = skillGapSlice.actions;
export default skillGapSlice.reducer;
