import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "auth/singup",
  async (firstName, lastName, username, email, password) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/signup`,
      {
        firstName,
        lastName,
        username,
        email,
        password,
      }
    );

    return response.status === 200 && response.data;
  }
);

export const loginWithCreds = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/login`,
      credentials
    );

    console.log(response);
    return response.status === 200 && response.data;
  }
);

const { token, user } = JSON.parse(localStorage?.getItem("login")) || {
  token: null,
  user: null,
};

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }

  delete axios.defaults.headers.common["Authorization"];
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    token: token,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      localStorage?.removeItem("login");
      state.token = null;
      setupAuthHeaderForServiceCalls(null);
    },
  },
  extraReducers: {
    [loginWithCreds.pending]: (state) => {
      state.status = "loading";
    },
    [loginWithCreds.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      state.status = "fulfilled";
      state.user = user;
      state.token = token;
      localStorage?.setItem("login", JSON.stringify({ token, user }));
      setupAuthHeaderForServiceCalls(token);
    },
    [loginWithCreds.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [signup.pending]: (state) => {
      state.status = "signing up";
    },
    [signup.fulfilled]: (state, action) => {
      state.status = "fulfilled";
    },
    [signup.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
