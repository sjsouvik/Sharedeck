import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Compose.css";

import { postAdded } from "../postsSlice";

const Compose = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState("");
  const btnDisable = postContent.trim().length === 0 || postContent === "";

  return (
    <div className="width-page">
      <div className="heading width-md">Compose</div>
      <div className="btn-row width-md">
        <div class="avatar">
          <p className="avatar-text">
            {user.firstName.charAt(0) + user.lastName.charAt(0)}
          </p>
        </div>
        <button
          className={
            btnDisable
              ? "btn-primary btn-post btn-disable"
              : "btn-primary btn-post"
          }
          onClick={() => {
            dispatch(postAdded({ postContent, userId: user._id, token }));
            navigate("/");
          }}
          disabled={btnDisable}
        >
          Post
        </button>
      </div>
      <textarea
        cols="30"
        rows="8"
        placeholder="What's on your mind..."
        className="input-control textarea-control"
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Compose;
