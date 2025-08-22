import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCareers,
  fetchCareerById,
  searchCareers,
  getRecommendedCareers,
} from './careerService';
import { Career, CareerState } from './careerTypes';

const initialState: CareerState = {
  careers: [],
  currentCareer: null,
  loading: false,
  error: null,
};

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const loadCareers = createAsyncThunk(
  'careers/loadAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCareers();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to load careers');
    }
  }
);

export const loadCareerDetails = createAsyncThunk(
  'careers/loadDetails',
  async (id: string, { rejectWithValue }) => {
    try {
      return await fetchCareerById(id);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Career not found');
    }
  }
);

export const searchCareerList = createAsyncThunk(
  'careers/search',
  async (query: string, { rejectWithValue }) => {
    try {
      return await searchCareers(query);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Search failed');
    }
  }
);

export const loadRecommendedCareers = createAsyncThunk(
  'careers/recommendations',
  async (skills: string[], { rejectWithValue }) => {
    try {
      return await getRecommendedCareers(skills);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Recommendation failed');
    }
  }
);

const careerSlice = createSlice({
  name: 'careers',
  initialState,
  reducers: {
    clearCurrentCareer: (state) => {
      state.currentCareer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCareers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCareers.fulfilled, (state, action: PayloadAction<Career[]>) => {
        state.loading = false;
        state.careers = action.payload;
      })
      .addCase(loadCareers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadCareerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCareerDetails.fulfilled, (state, action: PayloadAction<Career>) => {
        state.loading = false;
        state.currentCareer = action.payload;
      })
      .addCase(loadCareerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchCareerList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCareerList.fulfilled, (state, action: PayloadAction<Career[]>) => {
        state.loading = false;
        state.careers = action.payload;
      })
      .addCase(searchCareerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadRecommendedCareers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRecommendedCareers.fulfilled, (state, action: PayloadAction<Career[]>) => {
        state.loading = false;
        state.careers = action.payload;
      })
      .addCase(loadRecommendedCareers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentCareer } = careerSlice.actions;
export default careerSlice.reducer;