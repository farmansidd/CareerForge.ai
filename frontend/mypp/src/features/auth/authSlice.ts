import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from './authService';
import { AuthResponse, AuthState, RegisterData, Credentials } from './authTypes';
import { RootState, AppDispatch } from '../../store/store';

// Helper to load user from localStorage
const loadUserFromStorage = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

// Initial state with localStorage loading
const initialState: AuthState = {
  user: loadUserFromStorage(),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk<
  AuthResponse,
  RegisterData,
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await authService.register(userData);
    return response;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk<
  AuthResponse,
  Credentials,
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await authService.login(credentials);
    return response;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    logout: (state) => {
      authService.logout();
      state.user = null;
    },
    checkAuthStatus: (state) => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          state.user = JSON.parse(userStr);
        } catch {
          state.user = null;
        }
      } else {
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset, logout, checkAuthStatus } = authSlice.actions;
export default authSlice.reducer;
