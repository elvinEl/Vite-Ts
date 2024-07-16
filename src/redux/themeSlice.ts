import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { ColorTheme } from "../types/Types";
const initialState: ColorTheme = {
  colorScheme: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state: ColorTheme, action: PayloadAction<string>) => {
      state.colorScheme = action.payload;
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
