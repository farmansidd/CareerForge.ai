import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import dashboardService from './dashboardService';
import { DashboardStats, CareerGoal as Goal, Skill, AIRecommendation } from './types';

interface DashboardState {
  stats: DashboardStats | null;
  goals: Goal[];
  skills: Skill[];
  recommendations: AIRecommendation[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const GOALS_STORAGE_KEY = 'userGoals';

const saveGoalsToLocalStorage = (goals: Goal[]) => {
  try {
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error("Failed to save goals to local storage:", error);
  }
};

const loadGoalsFromLocalStorage = (): Goal[] => {
  try {
    const serializedGoals = localStorage.getItem(GOALS_STORAGE_KEY);
    if (serializedGoals === null) {
      return [];
    }
    return JSON.parse(serializedGoals);
  } catch (error) {
    console.error("Failed to load goals from local storage:", error);
    return [];
  }
};

const initialState: DashboardState = {
  stats: null,
  goals: loadGoalsFromLocalStorage(), // Load from local storage
  skills: [],
  recommendations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getDashboardStats = createAsyncThunk(
  'dashboard/getStats',
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getDashboardStats();
    } catch (error: any) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGoals = createAsyncThunk(
  'dashboard/getGoals',
  async (params: any, thunkAPI) => {
    try {
      return await dashboardService.getGoals(params);
    } catch (error: any) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSkills = createAsyncThunk(
  'dashboard/getSkills',
  async (params: any, thunkAPI) => {
    try {
      return await dashboardService.getSkills(params);
    } catch (error: any) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createGoal = createAsyncThunk(
  'dashboard/createGoal',
  async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'progress' | 'steps'>, thunkAPI) => {
    try {
      return await dashboardService.createGoal(goalData);
    } catch (error: any) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAIRecommendations = createAsyncThunk(
  'dashboard/getAIRecommendations',
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getAIRecommendations();
    } catch (error: any) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    reset: () => initialState,
    setMockStats: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.stats = {
        total_goals: 10,
        goals_completed: 5,
        skills_acquired: 12,
        pending_tasks: 3,
        career_readiness: 75,
        active_days: 5,
        learning_streak: 7,
        recent_activity: [
          { 
            type: 'activity', 
            description: 'Completed "Introduction to React"', 
            timestamp: '2 days ago' 
          },
          { 
            type: 'activity', 
            description: 'Started "Advanced TypeScript"', 
            timestamp: '1 day ago' 
          },
          { 
            type: 'goal', 
            description: 'Set a new goal: "Master Redux Toolkit"', 
            timestamp: '1 day ago' 
          },
        ],
      };
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action: PayloadAction<DashboardStats>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
        saveGoalsToLocalStorage(state.goals); // Save to local storage
      })
      .addCase(getGoals.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getSkills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSkills.fulfilled, (state, action: PayloadAction<Skill[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.skills = action.payload;
      })
      .addCase(getSkills.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload); // Add the new goal
        saveGoalsToLocalStorage(state.goals); // Save to local storage
      })
      .addCase(createGoal.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getAIRecommendations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAIRecommendations.fulfilled, (state, action: PayloadAction<AIRecommendation[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recommendations = action.payload;
      })
      .addCase(getAIRecommendations.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, setMockStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;