import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import postsReducer from "../features/posts/postsSlice";
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: userReducer,
    allPosts: postsReducer,
  },
});
