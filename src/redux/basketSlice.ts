import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { TopProductsType, basketInitialState } from "../types/Types";
const initialState: basketInitialState = {
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addBasket: (
      state: basketInitialState,
      action: PayloadAction<TopProductsType>
    ) => {
      state.basket = [...state.basket, action.payload];
    },
    deleteBasket: (
      state: basketInitialState,
      action: PayloadAction<number>
    ) => {
      state.basket = state.basket.filter(
        (product: TopProductsType) => product.id !== action.payload
      );
    },
  },
});
export const { addBasket, deleteBasket } = basketSlice.actions;
export default basketSlice.reducer;
