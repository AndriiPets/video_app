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
    like: (state, action) => {
      if (!state.currVideo?.likes.includes(action.payload)) {
        state.currVideo?.likes.push(action.payload);
        state.currVideo?.dislikes.splice(
          state.currVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currVideo?.dislikes.includes(action.payload)) {
        state.currVideo?.dislikes.push(action.payload);
        state.currVideo?.likes.splice(
          state.currVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFaliure, like, dislike } =
  videoSlice.actions;

export default videoSlice.reducer;
