import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  createGoal,
  fetchGoals,
  updateGoal,
  deleteGoal,
  updateGoalStatus,
} from './goalService';
import { Goal, GoalState, GoalFormData } from './goalTypes';

const initialState: GoalState = {
  goals: [],
  loading: false,
  error: null,
  success: false,
};

export const loadGoals = createAsyncThunk(
  'goals/loadAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchGoals();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load goals');
    }
  }
);

export const addNewGoal = createAsyncThunk(
  'goals/create',
  async (goalData: GoalFormData, { rejectWithValue }) => {
    try {
      return await createGoal(goalData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create goal');
    }
  }
);

export const modifyGoal = createAsyncThunk(
  'goals/update',
  async ({ id, goalData }: { id: string; goalData: Partial<GoalFormData> }, { rejectWithValue }) => {
    try {
      return await updateGoal(id, goalData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update goal');
    }
  }
);

export const removeGoal = createAsyncThunk(
  'goals/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteGoal(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete goal');
    }
  }
);

export const changeGoalStatus = createAsyncThunk(
  'goals/changeStatus',
  async ({ id, status }: { id: string; status: Goal['status'] }, { rejectWithValue }) => {
    try {
      return await updateGoalStatus(id, status);
    } catch (error) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as any;
        return rejectWithValue(axiosError.response?.data?.message || 'Failed to update status');
      }
      return rejectWithValue('Failed to update status');
    }
  }
);

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load Goals
      .addCase(loadGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(loadGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add Goal
      .addCase(addNewGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.loading = false;
        state.success = true;
        state.goals.push(action.payload);
      })
      .addCase(addNewGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Goal
      .addCase(modifyGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.loading = false;
        state.success = true;
        const index = state.goals.findIndex(goal => goal.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })
      .addCase(modifyGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete Goal
      .addCase(removeGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeGoal.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.success = true;
        state.goals = state.goals.filter(goal => goal.id !== action.payload);
      })
      .addCase(removeGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Change Status
      .addCase(changeGoalStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeGoalStatus.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.loading = false;
        const index = state.goals.findIndex(goal => goal.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })
      .addCase(changeGoalStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccess } = goalSlice.actions;
export default goalSlice.reducer;