import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  category: ["Rent"] as string[],
  propType: [] as string[],
  beds: [] as string[],
  minPrice: [] as string[],
  maxPrice: [] as string[],
  district: [] as string[],
  subLocation: [] as string[],
  serviced: false,
  estate: false,
  swimPool: false,
  gym: false,
  electricity: false,
  paymentPlan: [] as string[],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string[]>) => { state.category = action.payload },
    setPropType: (state, action: PayloadAction<string[]>) => { state.propType = action.payload },
    setBeds: (state, action: PayloadAction<string[]>) => { state.beds = action.payload },
    setMinPrice: (state, action: PayloadAction<string[]>) => { state.minPrice = action.payload },
    setMaxPrice: (state, action: PayloadAction<string[]>) => { state.maxPrice = action.payload },
    setDistrict: (state, action: PayloadAction<string[]>) => { state.district = action.payload },
    setSubLocation: (state, action: PayloadAction<string[]>) => { state.subLocation = action.payload },
    setServiced: (state, action: PayloadAction<boolean>) => { state.serviced = action.payload },
    setEstate: (state, action: PayloadAction<boolean>) => { state.estate = action.payload },
    setSwimPool: (state, action: PayloadAction<boolean>) => { state.swimPool = action.payload },
    setGym: (state, action: PayloadAction<boolean>) => { state.gym = action.payload },
    setElectricity: (state, action: PayloadAction<boolean>) => { state.electricity = action.payload },
    setPaymentPlan: (state, action: PayloadAction<string[]>) => { state.paymentPlan = action.payload },
    resetFilters: () => initialState
  }
});

export const { setCategory, setPropType, setBeds, setMinPrice, setMaxPrice, setDistrict, setSubLocation, setServiced, setEstate, setSwimPool, setGym, setElectricity, setPaymentPlan, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;