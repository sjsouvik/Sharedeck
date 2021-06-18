import { Link } from "react-router-dom";

import ReactionButtons from "../ReactionButtons/ReactionButtons";

import "./AllPosts.css";

const AllPosts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div className="post">
          {/* <div class="avatar avatar-icn mr-1">
          <div className="avatar-text">
            {post.user.firstName.charAt(0) + post.user.lastName.charAt(0)}
          </div>
        </div> */}
          <article>
            <div style={{ marginBottom: "0.75rem" }}>
              <Link to="/profile" className="link">
                <span className="user-name">
                  {post.user.firstName + " " + post.user.lastName}
                </span>{" "}
                @<span className="user-id">{post.user.username}</span>
              </Link>
            </div>

            <Link to={{ pathname: `/post/${post.id}` }} className="link">
              <p style={{ margin: "0" }}>{post.caption}</p>
            </Link>

            <ReactionButtons post={post} />
          </article>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
