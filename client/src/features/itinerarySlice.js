import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const generateItinerary = createAsyncThunk(
  "itinerary/generate",
  async (itineraryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await axios.post(
        "http://localhost:4000/api/itinerary/generate",
        itineraryData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  itinerary: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateItinerary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateItinerary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.itinerary = action.payload;
      })
      .addCase(generateItinerary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || "Failed to generate itinerary";
      });
  },
});

export const { reset } = itinerarySlice.actions;
export default itinerarySlice.reducer;
