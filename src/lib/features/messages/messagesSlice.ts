import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAdminMessagesApi, fetchAgentMessagesApi, markReadAdminMessageApi, markReadAgentMessageApi, readAdminMessageApi, readAgentMessageApi } from '../../api/messagesApi';
import { AdminMessageDetail, Message, MessageDetail } from '@/lib/types';

interface MessageState {
  adminMessages: {
    data: Message[];
    loading: boolean;
    error: string | null;
  };
  messages: {
    data: Message[];
    loading: boolean;
    error: string | null;
  };
  adminMessageDetail: {
    data: AdminMessageDetail | null;
    loading: boolean;
    error: string | null;
  };
  messageDetail: {
    data: MessageDetail | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: MessageState = {
  adminMessages: {
    data: [],
    loading: false,
    error: null,
  },
  messages: {
    data: [],
    loading: false,
    error: null,
  },
  adminMessageDetail: {
    data: null,
    loading: false,
    error: null,
  },
  messageDetail: {
    data: null,
    loading: false,
    error: null,
  },
};

export const fetchAdminMessages = createAsyncThunk<Message[]>(
  'messages/fetchAdminMessages',
  async () => await fetchAdminMessagesApi()
);

export const fetchAgentMessages = createAsyncThunk<Message[]>(
  'messages/fetchAgentMessages',
  async () => await fetchAgentMessagesApi()
);

export const readAdminMessageById = createAsyncThunk<AdminMessageDetail, string>(
  'adminMessage/fetchById',
  async (id) => await readAdminMessageApi(id)
);

export const readAgentMessageById = createAsyncThunk<MessageDetail, string>(
  'message/fetchById',
  async (id) => await readAgentMessageApi(id)
);

export const markMessageAsReadAdminThunk = createAsyncThunk(
  'messages/markAsReadAdmin',
  async (id: string) => {
    await markReadAdminMessageApi(id)
    return id;
  }
);

export const markMessageAsReadAgentThunk = createAsyncThunk(
  'messages/markAsRead',
  async (id: string) => {
    await markReadAgentMessageApi(id)
    return id;
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminMessages.pending, (state) => {
        state.adminMessages.loading = true;
      })
      .addCase(fetchAdminMessages.fulfilled, (state, action) => {
        state.adminMessages.loading = false;
        state.adminMessages.data = action.payload;
      })
      .addCase(fetchAdminMessages.rejected, (state, action) => {
        state.adminMessages.loading = false;
        state.adminMessages.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchAgentMessages.pending, (state) => {
        state.messages.loading = true;
      })
      .addCase(fetchAgentMessages.fulfilled, (state, action) => {
        state.messages.loading = false;
        state.messages.data = action.payload;
      })
      .addCase(fetchAgentMessages.rejected, (state, action) => {
        state.messages.loading = false;
        state.messages.error = action.error.message || 'Something went wrong';
      })
      .addCase(readAdminMessageById.pending, (state) => {
        state.adminMessageDetail.loading = true;
      })
      .addCase(readAdminMessageById.fulfilled, (state, action) => {
        state.adminMessageDetail.loading = false;
        state.adminMessageDetail.data = action.payload;
      })
      .addCase(readAdminMessageById.rejected, (state, action) => {
        state.adminMessageDetail.loading = false;
        state.adminMessageDetail.error = action.error.message || 'Something went wrong';
      })
      .addCase(readAgentMessageById.pending, (state) => {
        state.messageDetail.loading = true;
      })
      .addCase(readAgentMessageById.fulfilled, (state, action) => {
        state.messageDetail.loading = false;
        state.messageDetail.data = action.payload;
      })
      .addCase(readAgentMessageById.rejected, (state, action) => {
        state.messageDetail.loading = false;
        state.messageDetail.error = action.error.message || 'Something went wrong';
      })
  },
});

export default messagesSlice.reducer;