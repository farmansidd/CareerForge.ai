import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AIMessage, AIState } from './aiTypes';

const initialState: AIState = {
  messages: [],
  loading: false,
  error: null,
  active: false,
};

export const sendMessage = createAsyncThunk(
  'ai/sendMessage',
  async (content: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      return data as AIMessage;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send message');
    }
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<AIMessage>) => {
      state.messages.push(action.payload);
    },
    toggleAI: (state) => {
      state.active = !state.active;
    },
    clearConversation: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<AIMessage>) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMessage, toggleAI, clearConversation } = aiSlice.actions;
export default aiSlice.reducer;
