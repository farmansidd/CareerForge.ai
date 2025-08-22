import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  adminData: [],
  loading: false,
  error: null,
  success: false,
};

// Async thunks for admin operations
export const fetchAdminData = createAsyncThunk(
  'admin/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      throw new Error('Failed to fetch admin data');
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch admin data');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch admin data
      .addCase(fetchAdminData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.loading = false;
        state.adminData = action.payload;
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess, setAdminData, clearError } = adminSlice.actions;
export default adminSlice.reducer;
