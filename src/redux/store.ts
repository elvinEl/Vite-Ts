import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import themeReducer from "./themeSlice";
import categoryReducer from "./categorySlice";
import currencyReducer from "./currencySlice";
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    theme: themeReducer,
    category: categoryReducer,
    currency: currencyReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
