import { useState, useEffect } from "react";
import "./style/Login.css";
import { Form, useNavigate } from "react-router-dom";

export default function Login() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("You has submitted");
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    })
      .then((res) => res.json()) //res.json() return object
      .then((data) => {
        if (data.msg === "fail") {
          setIsError(true);
          setFormData({ username: "", password: "" });
        } else {
          localStorage.setItem("jwt", data.token);
          navigate("/", {
            replace: true,
            // state: { token: data.token }, //! this statement is where we pass props
          });
        }
      });
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
