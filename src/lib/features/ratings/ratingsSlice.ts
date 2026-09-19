import { fetchRatingHistoryApi } from "@/lib/api/ratingApi";
import { RatingHistory } from "@/lib/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RatingState {
  ratingHistory: {
    data: RatingHistory[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: RatingState = {
  ratingHistory: {
    data: [],
    loading: false,
    error: null,
  },
};

export const fetchAgentRatingHistory = createAsyncThunk<
  RatingHistory[],
  string
>(
  "agents/fetchRatingHistory",
  async (email) => await fetchRatingHistoryApi(email)
);

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentRatingHistory.pending, (state) => {
        state.ratingHistory.loading = true;
      })
      .addCase(fetchAgentRatingHistory.fulfilled, (state, action) => {
        state.ratingHistory.loading = false;
        state.ratingHistory.data = action.payload;
      })
      .addCase(fetchAgentRatingHistory.rejected, (state, action) => {
        state.ratingHistory.loading = false;
        state.ratingHistory.error = action.error.message || "Something went wrong";
      });
  },
});

export default ratingsSlice.reducer;