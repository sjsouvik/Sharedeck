import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import postsReducer from "../features/posts/postsSlice";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    allUsers: userReducer,
    allPosts: postsReducer,
    profile: profileReducer,
  },
});
