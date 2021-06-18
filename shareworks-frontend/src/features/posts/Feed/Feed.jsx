import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import "./Feed.css";

import AllPosts from "../AllPosts/AllPosts";

const Feed = () => {
  const posts = useSelector((state) => state.allPosts.posts);

  return (
    <div className="width-page">
      <h3 className="heading">Home</h3>

      <Link to="/compose">
        <input
          type="text"
          className="form-control input-control"
          placeholder="What's on your mind..."
        />
      </Link>

      <AllPosts posts={posts.slice().reverse()} />
    </div>
  );
};

export default Feed;
