import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFeaturedPropertiesApi, fetchPropertiesApi, fetchSinglePropertyApi, fetchUnapprovedPropertiesApi } from '../../api/propertiesApi';
import { Property } from '@/lib/types';
import { RootState } from '@/lib/store';

interface PropertyState {
  properties: {
    data: Property[];
    loading: boolean;
    error: string | null;
  };
  featuredProperties: {
    data: Property[];
    loading: boolean;
    error: string | null;
  }

  unapprovedProperties: {
    data: Property[];
    loading: boolean;
    error: string | null;
  }

  propertyDetail: {
    data: Property | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: PropertyState = {
  properties: {
    data: [],
    loading: false,
    error: null,
  },
  unapprovedProperties: {
    data: [],
    loading: false,
    error: null,
  },
  featuredProperties: {
    data: [],
    loading: false,
    error: null,
  },
  propertyDetail: {
    data: null,
    loading: false,
    error: null,
  },
};

export const fetchProperties = createAsyncThunk<Property[]>(
  'properties/fetchProperties',
  async () => await fetchPropertiesApi()
);

export const fetchUnapprovedProperties = createAsyncThunk<Property[]>(
  'properties/fetchUnapprovedProperties',
  async () => await fetchUnapprovedPropertiesApi()
);

export const fetchFeaturedProperties = createAsyncThunk<Property[]>(
  'properties/fetchFeatureDProperties',
  async () => await fetchFeaturedPropertiesApi()
);

export const fetchPropertyById = createAsyncThunk<Property, string, {state: RootState}>(
  'property/fetchbyId',
  async (id) => await fetchSinglePropertyApi(id)
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.properties.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.properties.loading = false;
        state.properties.data = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.properties.loading = false;
        state.properties.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchUnapprovedProperties.pending, (state) => {
        state.unapprovedProperties.loading = true;
      })
      .addCase(fetchUnapprovedProperties.fulfilled, (state, action) => {
        state.unapprovedProperties.loading = false;
        state.unapprovedProperties.data = action.payload;
      })
      .addCase(fetchUnapprovedProperties.rejected, (state, action) => {
        state.unapprovedProperties.loading = false;
        state.unapprovedProperties.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.featuredProperties.loading = true;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.featuredProperties.loading = false;
        state.featuredProperties.data = action.payload;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.featuredProperties.loading = false;
        state.featuredProperties.error = action.error.message || 'Failed to fetch featured properties';
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.propertyDetail.loading = true;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.propertyDetail.loading = false;
        state.propertyDetail.data = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.propertyDetail.loading = false;
        state.propertyDetail.error = action.error.message || 'Something went wrong';
      });
  },
});

export default propertiesSlice.reducer;