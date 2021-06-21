import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AllPosts from "../../posts/AllPosts/AllPosts";

import "./Profile.css";

import { loadUser, loadPostsForUser } from "../../profile/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { state: userId } = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { user, posts } = useSelector((state) => state.profile);

  const ownPosts = posts.filter((post) => post.user.username === user.username);

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  useEffect(
    () =>
      (async () => {
        await dispatch(loadUser({ userId, token }));
        dispatch(loadPostsForUser({ userId, token }));
      })(),
    [userId]
  );

  return (
    <div className="width-page profile">
      <div className="heading">
        {user?.firstName + " " + user?.lastName}
        <div
          style={{ fontSize: "0.9rem", marginTop: "0.5rem", fontWeight: "200" }}
        >
          {ownPosts.length} Posts
        </div>
      </div>

      <div style={{ textAlign: "left" }}>
        <p className="fullname">{user?.firstName + " " + user?.lastName}</p>
        <div>@{user?.username}</div>
        <p>{user?.bio}</p>
        <p>Joined on {getDate(user?.createdAt)}</p>
        <p>
          <Link
            to={{ pathname: `/${user?.username}/following` }}
            state={{
              connections: user?.following,
              userId: user?._id,
              heading: "Following",
            }}
            className="link"
          >
            <span className="connection-count">{user?.following.length}</span>{" "}
            Following
          </Link>{" "}
          <Link
            to={{ pathname: `/${user?.username}/followers` }}
            state={{
              connections: user?.followers,
              userId: user?._id,
              heading: "Followers",
            }}
            className="link"
          >
            <span className="connection-count">{user?.followers.length}</span>{" "}
            Followers
          </Link>
        </p>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <AllPosts posts={ownPosts} />
      </div>
    </div>
  );
};

export default Profile;
