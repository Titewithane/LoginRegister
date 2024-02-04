import { useState, useEffect, useRef } from "react";
import { Form, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import "./LoginRegister.css";
import axios from "axios";
import api from "../../utils/api";

export default function Login() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [isFocusUsername, setIsFocusUsername] = useState(false);
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const usernameRef = useState(null);
  const passwordRef = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await api.post(
      "http://localhost:5000/auth/login",
      FormData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response) {
      navigate("/register", { replace: true });
    } else {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/", { replace: true });
    }
  };

  const handleDivFocus = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (evt) => {
    const changeField = evt.target.name;
    const newValue = evt.target.value;
    setFormData((curr) => {
      return { ...curr, [changeField]: newValue };
    });
  };

  return (
    <div className="container">
      <div className="Layout">
        <Layout />
      </div>
      <div className="form-container">
        <form>
          <div className="label">
            <h1>Login</h1>
          </div>
          <div className="username">
            <input
              ref={usernameRef}
              key="username"
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              value={FormData.username}
              onFocus={() => setIsFocusUsername(true)}
              onBlur={() => !FormData.username && setIsFocusUsername(false)}
            />
            {!isFocusUsername ? (
              <div
                className="supText"
                onClick={() => handleDivFocus(usernameRef)}
              >
                username
              </div>
            ) : (
              <div className="supTextFocus">username</div>
            )}
          </div>
          <div className="password">
            <input
              ref={passwordRef}
              key={"password"}
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={FormData.password}
              onFocus={() => setIsFocusPassword(true)}
              onBlur={() => !FormData.password && setIsFocusPassword(false)}
            />
            {!isFocusPassword ? (
              <div
                className="supText"
                onClick={() => handleDivFocus(passwordRef)}
              >
                password
              </div>
            ) : (
              <div className="supTextFocus">password</div>
            )}
          </div>
          {isError && (
            <div className="error">
              <span>Something went wrong</span>
            </div>
          )}
          <div className="btn">
            <button onClick={handleSubmit}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
