import { useDispatch } from "react-redux";

import "./ReactionButtons.css";

import { reactionAdded } from "../postsSlice";

const reactionEmojis = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: "1rem" }}>
      {Object.keys(reactionEmojis).map((reaction) => {
        return (
          <button
            className="btn-reaction"
            onClick={() =>
              dispatch(reactionAdded({ postId: post.id, reaction }))
            }
          >
            {reactionEmojis[reaction]} {post.reactions[reaction]}
          </button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;
