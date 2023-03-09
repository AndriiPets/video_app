import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  menu: boolean;
}

const initialState: UiState = {
  menu: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    open: (state) => {
      state.menu = true;
    },
    close: (state) => {
      state.menu = false;
    },
  },
});

export const { open, close } = uiSlice.actions;

export default uiSlice.reducer;
