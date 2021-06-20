import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./Feed.css";

import AllPosts from "../AllPosts/AllPosts";

import { loadPosts } from "../postsSlice";
import { loadUsers } from "../../user/userSlice";

import empty from "../../../assets/empty.svg";

const Feed = () => {
  const { posts, status } = useSelector((state) => state.allPosts);
  const {
    user: { _id },
    token,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(
    () =>
      (async () => {
        if (status === "idle") {
          await dispatch(loadPosts({ userId: _id, token }));
          dispatch(loadUsers(token));
        }
      })(),
    [status, dispatch, _id, token]
  );

  return (
    <div className="width-page">
      <div className="heading">Home</div>

      <Link to="/compose">
        <input
          type="text"
          className="input-control"
          placeholder="What's on your mind..."
        />
      </Link>

      {status === "loading" && <p>Please wait, loading feed for you...</p>}
      {status === "error" && (
        <p>Something went wrong, try to refresh the page...</p>
      )}
      <AllPosts posts={posts.slice()} />
      {posts.length === 0 && (
        <div>
          <p>
            You haven't yet posted anything, create some posts, follow people
            and refresh the home page to see their latest activity...
          </p>
          <img src={empty} alt="No posts" className="width-page" />
        </div>
      )}
    </div>
  );
};

export default Feed;
