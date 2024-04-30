import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  activeContactId: null
};

// Async thunk for fetching messages based on a user or conversation ID
export const fetchMessages = createAsyncThunk(
  'messaging/fetchMessages',
  async (conversationId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/messages/${conversationId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for sending a new message
export const sendMessage = createAsyncThunk(
  'messaging/sendMessage',
  async ({ recipientId, text }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/api/messages', {
        recipient: recipientId,
        text
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Reducer to handle incoming WebSocket messages
export const receiveMessage = (state, action) => {
  state.messages.push(action.payload);
};

// Messaging slice
const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    resetMessagingState: (state) => initialState,
    setActiveContact: (state, action) => {
      state.activeContactId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addMatcher(
        (action) => action.type.endsWith('/receiveMessage'),
        receiveMessage
      );
  }
});

export const { resetMessagingState, setActiveContact, addMessage } = messagingSlice.actions;
export default messagingSlice.reducer;
