import { fetchAgentProfileApi, fetchUserProfileApi } from "@/lib/api/profileApi";
import { Agent, UserProfile } from "@/lib/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  user: {
    data: UserProfile | null;
    loading: boolean;
    error: string | null;
  };
  agent: {
    data: Agent | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: ProfileState = {
  user: {
    data: null,
    loading: false,
    error: null,
  },
  agent: {
    data: null,
    loading: false,
    error: null,
  },
};

export const fetchUserProfile = createAsyncThunk<UserProfile>(
  'user/fetchUserProfile',
  async () => await fetchUserProfileApi()
);

export const fetchAgentProfile = createAsyncThunk<Agent>(
  'agent/fetchAgentProfile',
  async () => await fetchAgentProfileApi()
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchAgentProfile.pending, (state) => {
        state.agent.loading = true;
      })
      .addCase(fetchAgentProfile.fulfilled, (state, action) => {
        state.agent.loading = false;
        state.agent.data = action.payload;
      })
      .addCase(fetchAgentProfile.rejected, (state, action) => {
        state.agent.loading = false;
        state.agent.error = action.error.message || 'Something went wrong';
      });
  },
});

export default profileSlice.reducer;