import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInspectionsApi, fetchSingleInspectionApi } from '../../api/inspectionsApi';
import { Inspection } from '@/lib/types';
import { RootState } from '@/lib/store';

interface InspectionState {
  inspections: {
    data: Inspection[];
    loading: boolean;
    error: string | null;
  };
  inspectionDetail: {
    data: Inspection | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: InspectionState = {
  inspections: {
    data: [],
    loading: false,
    error: null,
  },
  inspectionDetail: {
    data: null,
    loading: false,
    error: null,
  },
};

export const fetchInspections = createAsyncThunk<Inspection[]>(
  'inspections/fetchInspections',
  async () => await fetchInspectionsApi()
);

export const fetchInspectionById = createAsyncThunk<Inspection, string, {state: RootState}>(
  'inspection/fetchById',
  async (id) => await fetchSingleInspectionApi(id)
);

const inspectionsSlice = createSlice({
  name: 'inspections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInspections.pending, (state) => {
        state.inspections.loading = true;
      })
      .addCase(fetchInspections.fulfilled, (state, action) => {
        state.inspections.loading = false;
        state.inspections.data = action.payload;
      })
      .addCase(fetchInspections.rejected, (state, action) => {
        state.inspections.loading = false;
        state.inspections.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchInspectionById.pending, (state) => {
        state.inspectionDetail.loading = true;
      })
      .addCase(fetchInspectionById.fulfilled, (state, action) => {
        state.inspectionDetail.loading = false;
        state.inspectionDetail.data = action.payload;
      })
      .addCase(fetchInspectionById.rejected, (state, action) => {
        state.inspectionDetail.loading = false;
        state.inspectionDetail.error = action.error.message || 'Something went wrong';
      });
  },
});

export default inspectionsSlice.reducer;