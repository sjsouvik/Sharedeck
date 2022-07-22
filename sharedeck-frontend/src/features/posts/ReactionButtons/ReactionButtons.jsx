import { useDispatch, useSelector } from "react-redux";

import "./ReactionButtons.css";

import { userReacted, reactionAdded } from "../postsSlice";

export const reactionEmojis = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = ({ post }) => {
  const {
    user: { _id },
    token,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const reactionHandler = async ({ postId, reaction, userId, token }) => {
    await dispatch(userReacted({ postId, reaction, userId, token }));
    dispatch(reactionAdded({ postId, reaction, userId }));
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {Object.keys(reactionEmojis).map((reaction) => (
        <button
          key={reaction}
          className={
            post?.reactions[reaction].find((userId) => userId === _id)
              ? "btn-reaction btn-reacted"
              : "btn-reaction"
          }
          onClick={() =>
            reactionHandler({ postId: post?._id, reaction, userId: _id, token })
          }
        >
          {reactionEmojis[reaction]} {post?.reactions[reaction].length}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
