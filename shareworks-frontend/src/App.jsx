import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import person from "./assets/person.svg";

import PrivateRoute from "./features/PrivateRoute";
import Feed from "./features/posts/Feed/Feed";
import Compose from "./features/posts/Compose/Compose";
import Profile from "./features/user/Profile/Profile";
import Login from "./features/auth/Login/Login";
import Signup from "./features/auth/Signup/Signup";

export default function App() {
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
            <Link to={"/login"}>
              <img src={person} alt="" style={{ height: "1.5rem" }} />
              <div style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>
                {"Login"}
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <PrivateRoute path="/" element={<Feed />} />
          <PrivateRoute path="/compose" element={<Compose />} />
          <PrivateRoute path="/post/:{postId}" />
          <PrivateRoute path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}
