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
      const existingProduct = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (!existingProduct) {
        state.basket = [...state.basket, { ...action.payload, quantity: 1 }];
      }
    },
    deleteBasket: (
      state: basketInitialState,
      action: PayloadAction<number>
    ) => {
      state.basket = state.basket.filter(
        (product: TopProductsType) => product.id !== action.payload
      );
    },
    incrementQuantity: (
      state: basketInitialState,
      action: PayloadAction<number>
    ) => {
      const product = state.basket.find(
        (product: TopProductsType) => product.id === action.payload
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (
      state: basketInitialState,
      action: PayloadAction<number>
    ) => {
      const product = state.basket.find(
        (product: TopProductsType) => product.id === action.payload
      );
      if (product && product.quantity >= 1) {
        product.quantity -= 1;
      }
    },
  },
});
export const { addBasket, deleteBasket, incrementQuantity, decrementQuantity } =
  basketSlice.actions;
export default basketSlice.reducer;
