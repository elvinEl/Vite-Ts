import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedCurrency: "USD",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
    },
  },
});
export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
