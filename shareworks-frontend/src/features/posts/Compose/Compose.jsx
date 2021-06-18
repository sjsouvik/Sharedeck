import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Compose.css";

import person from "../../../assets/person.svg";

import { postAdded } from "../postsSlice";

const Compose = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState("");
  const btnDisable = postContent.trim().length === 0 || postContent === "";

  return (
    <div className="width-page">
      <h3 className="heading width-md">Compose</h3>
      <div className="btn-row width-md">
        {/* <img src={person} alt="user-logo" style={{ height: "1.5rem" }} /> */}
        <div class="avatar avatar-icn">
          <p className="avatar-text">SJ</p>
        </div>
        <button
          className={
            btnDisable
              ? "btn btn-primary btn-post btn-disable"
              : "btn btn-primary btn-post"
          }
          onClick={() => {
            dispatch(postAdded(postContent));
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
        className="form-control textarea-control"
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Compose;
