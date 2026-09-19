// store/slices/modalSlice.ts

import { BlogFormPayload } from '@/schemas/schema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  loginOpen: boolean;
  signupOpen: boolean;
  newAdminMessageOpen: boolean;
  newAgentMessageOpen: boolean;
  receiver?: string;
  blogModal: {
    isOpen: boolean;
    isEdit: boolean;
    id: string | number | null;
    data: null | BlogFormPayload;
  };
};

const initialState: ModalState = {
  loginOpen: false,
  signupOpen: false,
  newAdminMessageOpen: false,
  newAgentMessageOpen: false,
  receiver: undefined,
  blogModal: {
    isOpen: false,
    isEdit: false,
    id: null,
    data: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLogin: (state) => {
      state.loginOpen = true;
      state.signupOpen = false;
      state.newAdminMessageOpen = false;
      state.newAgentMessageOpen = false;
    },
    openSignup: (state) => {
      state.signupOpen = true;
      state.loginOpen = false;
      state.newAdminMessageOpen = false;
      state.newAgentMessageOpen = false;
    },
    openNewAdminMessage: (state, action: PayloadAction<string | undefined>) => {
      state.signupOpen = false;
      state.loginOpen = false;
      state.newAdminMessageOpen = true;
      state.newAgentMessageOpen = false;
      state.receiver = action.payload;
    },
    openNewAgentMessage: (state, action: PayloadAction<string | undefined>) => {
      state.signupOpen = false;
      state.loginOpen = false;
      state.newAdminMessageOpen = false;
      state.newAgentMessageOpen = true;
      state.receiver = action.payload;
    },
    openBlogModal: (state, action: PayloadAction<{ isEdit: boolean; data?: BlogFormPayload; id?: string | number }>) => {
      state.blogModal.isOpen = true;
      state.blogModal.isEdit = action.payload.isEdit;
      state.blogModal.data = action.payload.data || null;
      state.blogModal.id = action.payload.id || null;
      state.signupOpen = false;
      state.loginOpen = false;
      state.newAdminMessageOpen = false;
      state.newAgentMessageOpen = false;
    },
    closeModals: (state) => {
      state.loginOpen = false;
      state.signupOpen = false;
      state.newAdminMessageOpen = false;
       state.newAgentMessageOpen = false;
      state.blogModal = { isOpen: false, isEdit: false, id: null, data: null };
    },
  },
});

export const { openLogin, openSignup, openNewAdminMessage, openNewAgentMessage, openBlogModal, closeModals } = modalSlice.actions;
export default modalSlice.reducer;