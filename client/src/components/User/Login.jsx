import { useState, useEffect } from "react";
import "./Login.css";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api";

export default function Login() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
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

  const handleChange = (evt) => {
    const changeField = evt.target.name;
    const newValue = evt.target.value;
    setFormData((curr) => {
      return { ...curr, [changeField]: newValue };
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="username">
          <input
            key="username"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={FormData.username}
          />
        </div>
        <div className="password">
          <input
            key={"password"}
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={FormData.password}
          />
        </div>
        {isError && (
          <div className="error">
            <span>Something went wrong</span>
          </div>
        )}
        <button>Login</button>
      </form>
    </div>
  );
}
