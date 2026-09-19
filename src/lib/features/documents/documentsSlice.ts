import { fetchAgentDocumentsApi, fetchAgentDocumentsByEmailApi } from "@/lib/api/documentsApi";
import { Document } from "@/lib/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface DocumentState {
  agentDocuments: {
    data: Document | null;
    loading: boolean;
    error: string | null;
  };
  agentDocumentsByEmail: {
    data: Document | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: DocumentState = {
  agentDocuments: {
    data: null,
    loading: false,
    error: null,
  },
  agentDocumentsByEmail: {
    data: null,
    loading: false,
    error: null,
  },
};

export const fetchAgentDocuments = createAsyncThunk<Document>(
  "agents/fetchAgentDocuments",
  async () => await fetchAgentDocumentsApi()
);

export const fetchAgentDocumentsByEmail = createAsyncThunk<Document, string>(
  "agents/fetchAgentDocumentsByEmail",
  async (email) => await fetchAgentDocumentsByEmailApi(email)
);

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentDocuments.pending, (state) => {
        state.agentDocuments.loading = true;
      })
      .addCase(fetchAgentDocuments.fulfilled, (state, action) => {
        state.agentDocuments.loading = false;
        state.agentDocuments.data = action.payload;
      })
      .addCase(fetchAgentDocuments.rejected, (state, action) => {
        state.agentDocuments.loading = false;
        state.agentDocuments.data = null;
        state.agentDocuments.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchAgentDocumentsByEmail.pending, (state) => {
        state.agentDocumentsByEmail.loading = true;
      })
      .addCase(fetchAgentDocumentsByEmail.fulfilled, (state, action) => {
        state.agentDocumentsByEmail.loading = false;
        state.agentDocumentsByEmail.data = action.payload;
      })
      .addCase(fetchAgentDocumentsByEmail.rejected, (state, action) => {
        state.agentDocumentsByEmail.loading = false;
        state.agentDocumentsByEmail.data = null;
        state.agentDocumentsByEmail.error = action.error.message || "Something went wrong";
      });
  },
});

export default documentsSlice.reducer;
