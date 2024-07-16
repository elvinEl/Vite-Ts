import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import themeReducer from "./themeSlice";
import categoryReducer from "./categorySlice";
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    theme: themeReducer,
    category: categoryReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
