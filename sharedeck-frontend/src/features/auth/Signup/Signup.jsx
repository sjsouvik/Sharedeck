import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginWithCreds, signup } from "../authSlice";

import "../Login/Login.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const { signupStatus, signupError } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleFormValidation = () => {
    let isFormValid = true;
    let formErrors = {};

    if (firstName.trim().length < 3) {
      isFormValid = false;
      formErrors["firstNameError"] =
        "First name must contain min. 3 characters";
    }
    if (username.trim().length < 3) {
      isFormValid = false;
      formErrors["usernameError"] = "Username must contain min. 3 characters";
    }
    if (lastName.trim().length === 0) {
      isFormValid = false;
      formErrors["lastNameError"] = "Last name must contain min. 1 character";
    }
    if (password.length < 5 || !/\d/.test(password)) {
      isFormValid = false;
      formErrors["passwordError"] =
        "Password must contain min. 5 characters and 1 number";
    }

    setFormErrors(formErrors);

    return isFormValid;
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    if (handleFormValidation()) {
      await dispatch(
        signup({ firstName, lastName, username, email, password })
      );

      await dispatch(loginWithCreds({ email, password }));
      navigate("/");
    }
  };

  const {
    firstNameError,
    lastNameError,
    usernameError,
    emailError,
    passwordError,
  } = formErrors;

  return (
    <form className="form" onSubmit={signupHandler}>
      <h3>Create your account</h3>
      <p className="input-error">{signupError}</p>
      <input
        type="text"
        className="form-control"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      {firstNameError !== undefined && (
        <p className="input-error">{firstNameError}</p>
      )}

      <input
        type="text"
        className="form-control"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      {lastNameError !== undefined && (
        <p className="input-error">{lastNameError}</p>
      )}

      <input
        type="text"
        className="form-control"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {usernameError !== undefined && (
        <p className="input-error">{usernameError}</p>
      )}

      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {emailError !== undefined && <p className="input-error">{emailError}</p>}

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
      {passwordError !== undefined && (
        <p className="input-error">{passwordError}</p>
      )}

      <button
        className={
          signupStatus === "loading"
            ? "btn btn-primary form-button btn-disable"
            : "btn btn-primary form-button"
        }
        disabled={signupStatus === "loading"}
      >
        {signupStatus === "loading" ? "Signing up" : "SIGNUP"}
      </button>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="link-login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;
