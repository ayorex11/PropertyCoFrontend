import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCataloguesApi, fetchDisapprovedCataloguesApi, fetchUnapprovedCataloguesApi } from '../../api/cataloguesApi';
import { Property } from '@/lib/types';

export const fetchCatalogues = createAsyncThunk<Property[]>(
  'catalogues/fetchCatalogues',
  async () => await fetchCataloguesApi()
);

export const fetchUnapprovedCatalogues = createAsyncThunk<Property[]>(
  'catalogues/fetchUnapprovedCatalogues',
  async () => await fetchUnapprovedCataloguesApi()
);

export const fetchDisapprovedCatalogues = createAsyncThunk<Property[]>(
  'catalogues/fetchDisapprovedCatalogues',
  async () => await fetchDisapprovedCataloguesApi()
);

const cataloguesSlice = createSlice({
  name: 'catalogues',
  initialState: {
    catalogues: [] as Property[],
    unapprovedCatalogues: [] as Property[],
    disapprovedCatalogues: [] as Property[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCatalogues.fulfilled, (state, action) => {
        state.loading = false;
        state.catalogues = action.payload;
      })
      .addCase(fetchCatalogues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchUnapprovedCatalogues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnapprovedCatalogues.fulfilled, (state, action) => {
        state.loading = false;
        state.unapprovedCatalogues = action.payload;
      })
      .addCase(fetchUnapprovedCatalogues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchDisapprovedCatalogues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDisapprovedCatalogues.fulfilled, (state, action) => {
        state.loading = false;
        state.disapprovedCatalogues = action.payload;
      })
      .addCase(fetchDisapprovedCatalogues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default cataloguesSlice.reducer;