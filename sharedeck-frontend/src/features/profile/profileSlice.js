import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadUser = createAsyncThunk(
  "profile/getUser",
  async ({ userId, token }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/user/${userId}`,
      { headers: { authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
);

export const loadPostsForUser = createAsyncThunk(
  "profile/getPostsForUser",
  async ({ userId, token }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/post/${userId}`,
      { headers: { authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [loadUser.pending]: (state) => {
      state.status = "loading";
    },
    [loadUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.user = action.payload.user;
    },
    [loadUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [loadPostsForUser.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

// export const {} = profileSlice.actions;
export default profileSlice.reducer;
