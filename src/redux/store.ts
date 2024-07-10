import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import themeReducer from "./themeSlice";
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    theme: themeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
