import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user`);
  return response.status === 200 && response.data;
});

const userSlice = createSlice({
  name: "profile",
  initialState: {
    user: {
      firstName: "Souvik",
      lastName: "Jana",
      username: "sjsouvik",
      bio: "A technology enthusiast👩‍💻 | Tweet about my learnings, tech and #151daysofcode | Learning full stack web development | Neogrammer @neogcamp",
      followers: [],
      following: [],
      createdAt: "14 Jun 2021",
    },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [loadUsers.pending]: (state) => {
      state.status = "loading";
    },
    [loadUsers.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload.users;
    },
    [loadUsers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
