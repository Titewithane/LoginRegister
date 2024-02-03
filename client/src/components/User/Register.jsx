import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import "./Register.css";
import axios from "axios";

function Register() {
  const [count, setCount] = useState(0);
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [isValidated, setIsValidated] = useState(false);
  const [validateMsg, setValidateMsg] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isFocusUsername, setIsFocusUsername] = useState(false);
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const [isFocusRepassword, setIsFocusRepassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (FormData.username.length === 0) {
      setValidateMsg("Username cannot be empty");
      setIsValidated(false);
    } else {
      if (FormData.username.length < 5) {
        setValidateMsg("Username cannot be less than 5");
        setIsValidated(false);
      } else if (FormData.password.length === 0) {
        setValidateMsg("Please fill in the password");
        setIsValidated(false);
      } else if (FormData.password.length < 5) {
        setValidateMsg("Password cannot be less than 5");
        setIsValidated(false);
      } else if (FormData.password !== FormData.rePassword) {
        setValidateMsg("Password doesn't match");
        setIsValidated(false);
      } else {
        setValidateMsg("Looks Good!");
        setIsValidated(true);
      }
    }
  }, [FormData]);

  const handleError = () => {
    setFormData((curr) => {
      return { ...curr, username: "", password: "", rePassword: "" };
    });
    setIsErr(true);
  };

  const handleChange = (evt) => {
    count === 0 && setCount((val) => (val = val + 1));
    const changeField = evt.target.name;
    const newValue = evt.target.value;
    setFormData((curr) => {
      return { ...curr, [changeField]: newValue };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (isValidated) {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          FormData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        navigate("/login", { replace: true });
      } catch (err) {
        handleError();
      }
    }
  };

  return (
    <div className="container">
      <div className="Layout">
        <Layout />
      </div>
      <div className="register-container">
        <form>
          <div className="label">
            <h1>register</h1>
          </div>
          {isErr && <span>Somethings went wrong</span>}
          <div className="username">
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
              value={FormData.username}
              onFocus={() => setIsFocusUsername(true)}
              onBlur={() => setIsFocusUsername(false)}
            />
            {isFocusUsername && <div className="supUsername">username</div>}
          </div>
          <div className="password">
            <input
              type="password"
              name="password"
              id=""
              placeholder="password"
              onChange={handleChange}
              value={FormData.password}
            />
          </div>
          <div className="rePassword">
            <input
              type="password"
              name="rePassword"
              id=""
              placeholder="re-password"
              onChange={handleChange}
              value={FormData.rePassword}
            />
          </div>
          {count > 0 && (
            <div className="validate">
              <span>{validateMsg}</span>
            </div>
          )}
          <div className="btn">
            <button onClick={handleSubmit} type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
