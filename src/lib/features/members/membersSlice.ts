import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAgentsApi, fetchUserDetailsApi, fetchMembersApi, fetchUsersApi, fetchAgentDetailsApi } from '../../api/membersApi';
import { AgentDetail, Member, UserDetail } from '@/lib/types';
export const fetchMembers = createAsyncThunk<Member[]>(
  'members/fetchMembers',
  async () => await fetchMembersApi()
);

export const fetchAgents = createAsyncThunk<Member[]>(
  'members/fetchAgents',
  async () => await fetchAgentsApi()
);

export const fetchUsers = createAsyncThunk<Member[]>(
  'members/fetchUsers',
  async () => await fetchUsersApi()
);

export const fetchUserDetails = createAsyncThunk<UserDetail, string>(
  'members/fetchUserbyEmail',
  async (email) => await fetchUserDetailsApi(email)
);

export const fetchAgentDetails = createAsyncThunk<AgentDetail, string>(
  'members/fetchAgentbyEmail',
  async (email) => await fetchAgentDetailsApi(email)
);

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [] as Member[],
    agents: [] as Member[],
    users: [] as Member[],
    userDetail: null as UserDetail | null,
    agentDetail: null as AgentDetail | null,
    loading: {
      members: false,
      agents: false,
      users: false,
      userDetail: false,
      agentDetail: false,
    },
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading.members = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading.members = false;
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading.members = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchAgents.pending, (state) => {
        state.loading.agents = true;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading.agents = false;
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading.agents = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading.users = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading.users = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading.users = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading.userDetail = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading.userDetail = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading.userDetail = false;
        state.userDetail = null;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchAgentDetails.pending, (state) => {
        state.loading.agentDetail = true;
      })
      .addCase(fetchAgentDetails.fulfilled, (state, action) => {
        state.loading.agentDetail = false;
        state.agentDetail = action.payload;
      })
      .addCase(fetchAgentDetails.rejected, (state, action) => {
        state.loading.agentDetail = false;
        state.agentDetail = null;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default membersSlice.reducer;