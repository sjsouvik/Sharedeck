import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import person from "./assets/person.svg";
import Logout from "./assets/logout.png";
import people from "./assets/people.png";

import PrivateRoute from "./features/PrivateRoute";
import Feed from "./features/posts/Feed/Feed";
import SinglePost from "./features/posts/SinglePost/SinglePost";
import Compose from "./features/posts/Compose/Compose";
import People from "./features/user/People/People";
import Profile from "./features/profile/Profile/Profile";
import NotFound from "./features/notFound/NotFound";

import Login from "./features/auth/Login/Login";
import Signup from "./features/auth/Signup/Signup";

import { logout } from "./features/auth/authSlice";
import { userLoggedOut } from "./features/posts/postsSlice";

export default function App() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(userLoggedOut());
  };

  return (
    <div className="App">
      <nav className="sw-navigation">
        <div className="brand">
          <h3 className="nav-brand">
            <Link to="/">Shareworks</Link>
          </h3>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link
              to={token ? `/profile/${user?.username}` : "/login"}
              state={user?._id}
            >
              <img src={person} alt="" style={{ height: "1.5rem" }} />
              <div style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>
                {token ? "Hi, " + user?.firstName : "Login"}
              </div>
            </Link>
          </li>
          {token && (
            <>
              <li className="nav-item" style={{ cursor: "pointer" }}>
                <Link to="/people">
                  <img src={people} alt="" style={{ height: "1.5rem" }} />
                  <div style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>
                    People
                  </div>
                </Link>
              </li>

              <li
                className="nav-item"
                style={{ cursor: "pointer" }}
                onClick={logoutHandler}
              >
                <img src={Logout} alt="" style={{ height: "1.5rem" }} />
                <div style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>
                  Logout
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>

      <main>
        <Routes>
          <PrivateRoute path="/" element={<Feed />} />
          <PrivateRoute path="/compose" element={<Compose />} />
          <PrivateRoute path="/post/:postId" element={<SinglePost />} />
          <PrivateRoute path="/people" element={<People />} />
          <PrivateRoute path="/profile/:username" element={<Profile />} />
          <PrivateRoute path="/:username/following" element={<People />} />
          <PrivateRoute path="/:username/followers" element={<People />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
