import { useState, useEffect } from "react";
import "./style/Register.css";
import { Form } from "react-router-dom";

function Register() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [validateMsg, setValidateMsg] = useState("");
  const [isValidated, setIsValidated] = useState(true);

  useEffect(() => {
    if (FormData.username.length === 0) {
      setValidateMsg("Username cannot be empty");
      setIsValidated(false);
      if (FormData.username.length < 5) {
        setValidateMsg("Username cannot be less than 5");
        setIsValidated(false);
      } else {
        setValidateMsg("Looks Good!");
        setIsValidated(true);
      }
    } else {
      if (
        FormData.password !== FormData.rePassword ||
        FormData.password.length === 0
      ) {
        setValidateMsg("Password doesn't match");
        setIsValidated(false);
      } else {
        setValidateMsg("Looks Good!");
        setIsValidated(true);
      }
    }
  }, [FormData]);

  const handleChange = (evt) => {
    console.log("change");
    const changeField = evt.target.name;
    const newValue = evt.target.value;
    setFormData((curr) => {
      return { ...curr, [changeField]: newValue };
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      mode: "cors", // for fetch data from others domain
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Username is already used.") {
          setFormData({
            username: "",
            password: "",
            rePassword: "",
          });
        } else if (data.msg === "Username's length fail.") {
          setFormData((curr) => {
            return { ...curr, username: "" };
          });
        } else if (data.msg === "Somethings went wrong.") {
          setFormData({
            password: "",
            rePassword: "",
          });
        }
      });
  };

  return (
    <div className="container">
      <h1>register</h1>
      <form onSubmit={handleSubmit}>
        <div className="username">
          <input
            type="text"
            name="username"
            placeholder=""
            onChange={handleChange}
          />
        </div>
        <div className="password">
          <input
            type="password"
            name="password"
            id=""
            onChange={handleChange}
          />
        </div>
        <div className="rePassword">
          <input
            type="password"
            name="rePassword"
            id=""
            onChange={handleChange}
          />
        </div>
        <div className="validate">
          <span>{validateMsg}</span>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
