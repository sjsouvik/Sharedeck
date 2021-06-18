import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND}/post`);

  return response.status === 200 && response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [
      {
        id: "1",
        caption: "Just now signed up. My 1st koo",
        date: "today",
        reactions: {
          thumbsUp: 2,
          hooray: 4,
          heart: 6,
          rocket: 10,
          eyes: 20,
        },
        user: {
          username: "tanaypratap",
          firstName: "Tanay",
          lastName: "Pratap",
        },
      },
      {
        id: "2",
        caption:
          "India gave USA and other western countries hydroxychloroquine at the peak of their Covid-19 crisis. The West is giving us patronising lectures and sermons while holding up raw materials for vaccines during our peak. And dancing over the corpses.",
        date: "today",
        reactions: {
          thumbsUp: 2,
          hooray: 4,
          heart: 16,
          rocket: 15,
          eyes: 20,
        },
        user: {
          username: "sjsouvik",
          firstName: "Souvik",
          lastName: "Jana",
        },
      },
    ],
    status: "idle",
    error: null,
  },
  reducers: {
    reactionAdded: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      post.reactions[action.payload.reaction] += 1;
    },
    postAdded: (state, action) => {
      const newPost = {
        id: state.posts.length + 1,
        caption: action.payload,
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
        user: {
          userId: "sjsouvik",
          firstName: "Souvik",
          lastName: "Jana",
        },
      };
      state.posts.push(newPost);
    },
  },
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload.posts;
    },
    [loadPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { reactionAdded, postAdded } = postsSlice.actions;
export default postsSlice.reducer;
