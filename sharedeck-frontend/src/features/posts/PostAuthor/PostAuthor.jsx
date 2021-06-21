import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";

import "./PostAuthor.css";

const PostAuthor = ({ post }) => {
  const getTimePeriod = (timestamp) => {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    return `${timePeriod} ago`;
  };

  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <Link
        to={{ pathname: `/profile/${post?.user.username}` }}
        state={post?.user._id}
        className="link"
      >
        <span className="user-name">
          {post?.user.firstName + " " + post?.user.lastName}
        </span>
        <span className="user-id">@{post?.user.username}</span>
      </Link>
      <span className="post-date">{getTimePeriod(post?.createdAt)}</span>
    </div>
  );
};

export default PostAuthor;
