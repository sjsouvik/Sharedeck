import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk("auth/signup", async (signupData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/signup`,
    signupData
  );

  return response.data;
});

export const loginWithCreds = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/login`,
      credentials
    );

    return response.data;
  }
);

const { token, user } = JSON.parse(localStorage?.getItem("login")) || {
  token: null,
  user: null,
};

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = "Bearer " + token);
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
    signupStatus: "idle",
    signupError: null,
  },
  reducers: {
    logout: (state, action) => {
      localStorage?.removeItem("login");
      state.token = null;
      // setupAuthHeaderForServiceCalls(null);
    },
  },
  extraReducers: {
    [loginWithCreds.pending]: (state) => {
      state.status = "loading";
    },
    [loginWithCreds.fulfilled]: (state, action) => {
      const { user, token } = action.payload;
      state.status = "fulfilled";
      state.error = null;
      state.user = user;
      state.token = token;
      localStorage?.setItem("login", JSON.stringify({ token, user }));
      // setupAuthHeaderForServiceCalls(token);
    },
    [loginWithCreds.rejected]: (state, action) => {
      const errorMessage = action.error.message;
      const statusCode = errorMessage.substring(errorMessage.length - 3);

      state.status = "error";

      if (statusCode === "401" || statusCode === "400") {
        state.error = "Invalid email and password combination";
      } else if (statusCode !== "200") {
        state.error = "Something went wrong";
      }
    },
    [signup.pending]: (state) => {
      state.signupStatus = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      state.signupStatus = "fulfilled";
      state.signupError = null;
    },
    [signup.rejected]: (state, action) => {
      const errorMessage = action.error.message;
      const statusCode = errorMessage.substring(errorMessage.length - 3);
      console.log(statusCode);

      state.signupStatus = "error";

      if (statusCode === "422") {
        state.signupError = "Give a valid email to register";
      } else if (statusCode === "409") {
        state.signupError = "This email/username is already registered";
      } else if (statusCode !== "200") {
        state.signupError = "Something went wrong";
      }
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
