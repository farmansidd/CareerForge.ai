import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import dashboardService from './dashboardService';
import { CareerGoal as Goal, AIRecommendation } from './types';

// Types that match the actual API response from GET /dashboard/{user_id}
export interface ApiSkill {
  skill_id: number;
  name: string;
  category: string;
  difficulty: string;
  status: 'not_started' | 'pending' | 'completed';
  due_date: string | null;
}

export interface ApiDashboardStats {
  total_skills: number;
  completed_skills: number;
  pending_skills: number;
  not_started_skills: number;
  progress_percent: number;
}

export interface DashboardData {
    user_id: number;
    username: string;
    skills: ApiSkill[];
    dashboard_stats: ApiDashboardStats;
}

// The shape of our state in the Redux store
interface DashboardState {
  stats: ApiDashboardStats | null;
  skills: ApiSkill[];
  goals: Goal[]; // Kept for other potential features on the page
  recommendations: AIRecommendation[]; // Kept for other potential features
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
  skills: [],
  goals: loadGoalsFromLocalStorage(),
  recommendations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Thunks for async actions
export const getUserDashboard = createAsyncThunk(
  'dashboard/getUserDashboard',
  async (_, thunkAPI) => {
    try {
      console.log('Dashboard: Calling getUserDashboard API');
      const result = await dashboardService.getUserDashboard();
      console.log('Dashboard: API response received:', result);
      return result;
    } catch (error: any) {
      console.error('Dashboard: API call failed:', error);
      const message = (error.response?.data?.message) || error.message || error.toString();
      console.error('Dashboard: Error message:', message);
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
      console.log('Dashboard: Calling getAIRecommendations API');
      const result = await dashboardService.getAIRecommendations();
      console.log('Dashboard: AI Recommendations API response received:', result);
      return result;
    } catch (error: any) {
      console.error('Dashboard: AI Recommendations API call failed:', error);
      const message = (error.response?.data?.message) || error.message || error.toString();
      console.error('Dashboard: AI Recommendations Error message:', message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDashboard.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stats = action.payload.dashboard_stats;
        state.skills = action.payload.skills;
      })
      .addCase(getUserDashboard.rejected, (state, action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Keep other thunks for now, in case other components use them
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
        saveGoalsToLocalStorage(state.goals);
      })
      .addCase(getGoals.rejected, (state, action: PayloadAction<unknown>) => {
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
        state.goals.push(action.payload);
        saveGoalsToLocalStorage(state.goals);
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

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;

// Selectors
export const selectDashboardStats = (state: { dashboard: DashboardState }) => state.dashboard.stats;
export const selectUserSkills = (state: { dashboard: DashboardState }) => state.dashboard.skills;
export const selectCareerGoals = (state: { dashboard: DashboardState }) => state.dashboard.goals;
export const selectAIRecommendations = (state: { dashboard: DashboardState }) => state.dashboard.recommendations;
