import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadUsers = createAsyncThunk("users/getUsers", async (token) => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const updatedFollowing = createAsyncThunk(
  "users/updateFollowing",
  async ({ userId, followingUserId, token }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/user/follow/${userId}`,
      { followingUserId },
      { headers: { authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    followingUpdated: (state, action) => {
      const { userId, followingUserId } = action.payload;

      const user = state.users.find((user) => user._id === userId);
      const followingUser = state.users.find(
        (user) => user._id === followingUserId
      );
      const isFollowedBefore = user.following.find(
        (user) => user._id === followingUserId
      );
      if (isFollowedBefore) {
        const followingUserIdIndex = user.following.findIndex(
          (user) => user._id === followingUserId
        );
        const userIdIndex = followingUser.followers.findIndex(
          (user) => user._id === userId
        );

        user.following.splice(followingUserIdIndex, 1);
        followingUser.followers.splice(userIdIndex, 1);
      } else {
        user.following.push(followingUser);
        followingUser.followers.push(user);
      }
    },
  },
  extraReducers: {
    [loadUsers.pending]: (state) => {
      state.status = "loading";
    },
    [loadUsers.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.users = action.payload.users;
    },
    [loadUsers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updatedFollowing.fulfilled]: (state, action) => {
      console.log("UpdatedFollowing", action);
      state.status = "idle";
    },
  },
});

export const { followingUpdated } = userSlice.actions;
export default userSlice.reducer;
