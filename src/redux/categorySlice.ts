import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryInitialState } from "../types/Types";

const initialState: CategoryInitialState = {
  selectedCategory: null,
};
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (
      state: CategoryInitialState,
      action: PayloadAction<string>
    ) => {
      state.selectedCategory = action.payload;
    },
  },
});
export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
