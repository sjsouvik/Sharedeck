import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { reactionEmojis } from "../ReactionButtons/ReactionButtons";

import PostAuthor from "../PostAuthor/PostAuthor";
import ReactionButtons from "../ReactionButtons/ReactionButtons";

import "./SinglePost.css";

const SinglePost = () => {
  const { postId } = useParams();
  const { posts } = useSelector((state) => state.allPosts);

  const post = posts.find((post) => post._id === postId);

  const totalReactions = () => {
    return Object.keys(reactionEmojis).reduce((totalReactions, reaction) => {
      return totalReactions + post?.reactions[reaction].length;
    }, 0);
  };

  return (
    <div className="width-page">
      <div className="heading">Post</div>
      <div className="post">
        <article>
          <PostAuthor post={post} />
          <p style={{ margin: "0" }}>{post?.caption}</p>
          <p className="total-reactions">
            <span className="reaction-count">{totalReactions()}</span>{" "}
            <span className="reaction">Reactions</span>
          </p>
          <ReactionButtons post={post} />
        </article>
      </div>
    </div>
  );
};

export default SinglePost;
