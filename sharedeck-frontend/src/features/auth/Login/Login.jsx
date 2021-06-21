import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginWithCreds } from "../authSlice";

import "./Login.css";

const Login = () => {
  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    await dispatch(loginWithCreds({ email, password }));
    navigate("/");
  };

  return (
    <form className="form" onSubmit={loginHandler}>
      <h3>Log in to your account</h3>
      <p className="input-error">{error}</p>
      <div>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="password">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control password-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {password && (
          <div
            className="show-password"
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </div>
        )}
      </div>

      <button
        className={
          status === "loading"
            ? "btn btn-primary form-button btn-disable"
            : "btn btn-primary form-button"
        }
        disabled={status === "loading"}
      >
        {status === "loading" ? "Loggin in" : "LOGIN"}
      </button>
      <p>
        Not an user yet?{" "}
        <Link to="/signup" className="link-login">
          Create your account
        </Link>
      </p>
    </form>
  );
};

export default Login;
