import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteSavedPropertyApi,
  fetchSavedPropertiesApi,
} from "../../api/savedPropertiesApi";
import { SavedProperty } from "@/lib/types";

const initialState = {
  savedProperties: [] as SavedProperty[],
  loading: false,
  error: null as string | null,
};

export const fetchSavedProperties = createAsyncThunk<SavedProperty[]>(
  "savedProperties/fetchSavedProperties",
  async () => await fetchSavedPropertiesApi()
);

export const deleteSavedPropertyThunk = createAsyncThunk(
  "savedProperties/deleteSavedProperty",
  async (id: string) => {
    await deleteSavedPropertyApi(id);
    return id;
  }
);

const savedPropertiesSlice = createSlice({
  name: "savedProperties",
  initialState,
  reducers: {
    // deletePropertyLocally: (state, action) => {
    //   state.savedProperties = state.savedProperties.filter(
    //     (p) => p.id !== action.payload
    //   );
    // },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.savedProperties = action.payload;
      })
      .addCase(fetchSavedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(deleteSavedPropertyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSavedPropertyThunk.fulfilled, (state, action) => {
        state.loading = false
        state.savedProperties = state.savedProperties.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deleteSavedPropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
  },
});

export default savedPropertiesSlice.reducer;
