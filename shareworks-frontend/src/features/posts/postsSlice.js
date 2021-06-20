import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//to get the feed for the user
export const loadPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ userId, token }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/post/${userId}`,
      { headers: { authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
);

export const postAdded = createAsyncThunk(
  "posts/addPost",
  async ({ postContent, userId, token }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/post/${userId}`,
      { caption: postContent },
      { headers: { authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
);

export const userReacted = createAsyncThunk(
  "posts/addReaction",
  async ({ reaction, postId, userId, token }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/post/${postId}/${userId}`,
      { reaction },
      { headers: { authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    reactionAdded: (state, { payload: { postId, userId, reaction } }) => {
      const post = state.posts.find((post) => post._id === postId);
      const isUserReactedBefore = post.reactions[reaction].find(
        (uid) => uid === userId
      );

      const userIndex = post.reactions[reaction].findIndex(
        (uid) => uid === userId
      );
      isUserReactedBefore
        ? post.reactions[reaction].splice(userIndex, 1)
        : post.reactions[reaction].push(userId);
    },
    userLoggedOut: (state) => {
      state.status = "idle";
      state.posts = [];
    },
  },
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.posts = action.payload.posts;
    },
    [loadPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [postAdded.fulfilled]: (state) => {
      state.status = "idle";
    },
  },
});

export const { reactionAdded, userLoggedOut } = postsSlice.actions;
export default postsSlice.reducer;
