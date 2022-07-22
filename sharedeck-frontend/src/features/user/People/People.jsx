import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loadUsers, updatedFollowing, followingUpdated } from "../userSlice";

import "./People.css";

import Void from "../../../assets/void.svg";

const People = () => {
  const { users, status } = useSelector((state) => state.allUsers);
  const { user, token } = useSelector((state) => state.auth);

  const { state } = useLocation();
  const dispatch = useDispatch();

  const loggedInUser = users.find((User) => User._id === user._id);
  const User = users.find((user) => user._id === state?.userId);

  let filteredUsers = users;
  if (state?.heading === "Following") {
    filteredUsers = User.following;
  } else if (state?.heading === "Followers") {
    filteredUsers = User.followers;
  }

  const updateConnectionHandler = async ({
    userId,
    followingUserId,
    token,
  }) => {
    await dispatch(updatedFollowing({ userId, followingUserId, token }));
    // dispatch(followingUpdated({ userId, followingUserId }));
  };

  useEffect(
    () =>
      (async () => {
        if (status === "idle") {
          dispatch(loadUsers(token));
        }
      })(),
    [status, dispatch, token]
  );

  return (
    <div className="width-page">
      <div className="heading">
        {state?.heading ? state?.heading : "People"} ({filteredUsers.length})
      </div>
      {status === "error" && (
        <p>Something went wrong, try to refresh the page...</p>
      )}
      {filteredUsers.length === 0 && (
        <div>
          <p>No Data is available</p>
          <img src={Void} alt="No Data" className="width-page" />
        </div>
      )}
      {filteredUsers.map((user) => (
        <div className="people" key={user._id}>
          <div className="user-people">
            <Link
              to={{ pathname: `/profile/${user.username}` }}
              state={user._id}
              className="link"
            >
              <div>
                <div className="fullName">
                  {user.firstName + " " + user.lastName}
                </div>
                <p>@{user.username}</p>
                <p>{user.bio}</p>
              </div>
            </Link>

            {loggedInUser._id !== user._id && (
              <button
                className={
                  loggedInUser.following.find((User) => User._id === user._id)
                    ? "btn-post btn-primary"
                    : "btn-post btn-outline-follow"
                }
                onClick={() =>
                  updateConnectionHandler({
                    userId: loggedInUser._id,
                    followingUserId: user._id,
                    token,
                  })
                }
              >
                {loggedInUser.following.find((User) => User._id === user._id)
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default People;
