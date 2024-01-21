import { useState, useEffect } from "react";
import "./style/Login.css";
export default function Login() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("You has submitted");
  };

  const handleChange = (evt) => {
    const changeField = evt.target.name;
    const newValue = evt.target.value;
    setForm((curr) => {
      return { ...curr, [changeField]: newValue };
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="username">
          <input type="text" name="username" id="" onChange={handleChange} />
        </div>
        <div className="password">
          <input
            type="password"
            name="password"
            id=""
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
