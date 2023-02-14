import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Channel } from "../utils/Types";

interface UserState {
  currUser: Channel | null;
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  currUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<Channel>) => {
      state.loading = false;
      state.currUser = action.payload;
    },
    loginFaliure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { loginStart, loginSuccess, loginFaliure, logout } =
  userSlice.actions;

export default userSlice.reducer;
