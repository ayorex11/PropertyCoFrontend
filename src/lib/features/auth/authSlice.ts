import { Auth } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Auth = {
  access: null,
  refresh: null,
  user: null,
  access_expiration: null,
  refresh_expiration: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<Auth>) => {
      state.user = action.payload.user;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.access_expiration = action.payload.access_expiration;
      state.refresh_expiration = action.payload.refresh_expiration;
    },
    logoutUser: (state) => { 
      state.user = null;
      state.access = null;
      state.refresh = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;