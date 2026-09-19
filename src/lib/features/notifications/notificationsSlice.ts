import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAdminNotificationsApi, fetchAgentNotificationsApi, readAdminNotificationApi, readAgentNotificationApi } from '../../api/notificationsApi';
import { Notification } from '@/lib/types';

export const fetchAdminNotifications = createAsyncThunk<Notification[]>(
  'notifications/fetchAdminNotifications',
  async () => await fetchAdminNotificationsApi()
);

export const fetchAgentNotifications = createAsyncThunk<Notification[]>(
  'notifications/fetchAgentNotifications',
  async () => await fetchAgentNotificationsApi()
);

export const markNotificationAsReadAdminThunk = createAsyncThunk(
  'notifications/markAsReadAdmin',
  async (id: string) => {
    await readAdminNotificationApi(id)
    return id;
  }
);

export const markNotificationAsReadAgentThunk = createAsyncThunk(
  'notifications/markAsReadAgent',
  async (id: string) => {
    await readAgentNotificationApi(id)
    return id;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [] as Notification[],
    agentNotifications: [] as Notification[],
    agentNotificationLoading: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    markNotificationAsReadAdmin: (state, action) => {
    const id = action.payload;
    const notification = state.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchAdminNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(markNotificationAsReadAdminThunk.fulfilled, (state, action) => {
        const id = action.payload;
        const notification = state.notifications.find(n => n.id === id);
        if (notification) {
          notification.read = true;
        }
      })
      .addCase(markNotificationAsReadAdminThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to mark notification as read';
      })
      .addCase(markNotificationAsReadAgentThunk.fulfilled, (state, action) => {
        const id = action.payload;
        const notification = state.agentNotifications.find(n => n.id === id);
        if (notification) {
          notification.read = true;
        }
      })
      .addCase(markNotificationAsReadAgentThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to mark notification as read';
      })
      .addCase(fetchAgentNotifications.pending, (state) => {
        state.agentNotificationLoading = true;
      })
      .addCase(fetchAgentNotifications.fulfilled, (state, action) => {
        state.agentNotificationLoading = false;
        state.agentNotifications = action.payload;
      })
      .addCase(fetchAgentNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default notificationsSlice.reducer;