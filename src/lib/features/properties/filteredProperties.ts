import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Property } from '@/lib/types';

interface FilteredPropertiesState {
  data: Property[];
  loading: boolean;
}

const initialState: FilteredPropertiesState = {
  data: [],
  loading: false,
};

const filteredPropertiesSlice = createSlice({
  name: 'filteredProperties',
  initialState,
  reducers: {
    setFilteredProperties: (state, action: PayloadAction<Property[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    clearFilteredProperties: (state) => {
      state.data = [];
      state.loading = false;
    },
    setFilteredPropertiesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setFilteredProperties,
  clearFilteredProperties,
  setFilteredPropertiesLoading,
} = filteredPropertiesSlice.actions;

export default filteredPropertiesSlice.reducer;