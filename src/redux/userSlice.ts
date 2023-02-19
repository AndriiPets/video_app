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
      state.currUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (state.currUser?.subscribedUsers?.includes(action.payload)) {
        state.currUser.subscribedUsers.splice(
          state.currUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          )
        );
      } else {
        state.currUser?.subscribedUsers?.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFaliure, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;
