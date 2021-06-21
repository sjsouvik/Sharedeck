import { Link } from "react-router-dom";

import PostAuthor from "../PostAuthor/PostAuthor";
import ReactionButtons from "../ReactionButtons/ReactionButtons";

import "./AllPosts.css";

const AllPosts = ({ posts }) => {
  return (
    <div>
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post) => (
          <div className="post" key={post._id}>
            {/* <div class="avatar avatar-icn mr-1">
          <div className="avatar-text">
            {post.user.firstName.charAt(0) + post.user.lastName.charAt(0)}
          </div>
        </div> */}
            <article>
              <PostAuthor post={post} />

              <Link to={{ pathname: `/post/${post._id}` }} className="link">
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
