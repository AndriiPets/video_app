import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Video } from "../utils/Types";

interface VideoState {
  currVideo: Video | null;
  loading: boolean;
  error: boolean;
}

const initialState: VideoState = {
  currVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<Video>) => {
      state.loading = false;
      state.currVideo = action.payload;
    },
    fetchFaliure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFaliure } = videoSlice.actions;

export default videoSlice.reducer;
