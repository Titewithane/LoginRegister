import { useState, useEffect } from "react";
import "./style/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [count, setCount] = useState(0);
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [validateMsg, setValidateMsg] = useState("");
  const [isValidated, setIsValidated] = useState(true);
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

  const handleChange = (evt) => {
    count == 0 && setCount((val) => (val = val + 1));
    const changeField = evt.target.name;
    const newValue = evt.target.value;
    setFormData((curr) => {
      return { ...curr, [changeField]: newValue };
    });
  };

  const handleSubmit = (evt) => {
    if (!isValidated) {
      evt.preventDefault();
    } else {
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
          console.log(FormData);
          if (data.msg === "fail") {
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
          } else {
            navigate("/", { replace: true }); //! if replace is false our web can go back if it's true cannot go back anymore
          }
        });
    }
    evt.preventDefault();
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
            value={FormData.username}
          />
        </div>
        <div className="password">
          <input
            type="password"
            name="password"
            id=""
            onChange={handleChange}
            value={FormData.password}
          />
        </div>
        <div className="rePassword">
          <input
            type="password"
            name="rePassword"
            id=""
            onChange={handleChange}
            value={FormData.rePassword}
          />
        </div>
        <div className="validate">
          {count > 0 && <span>{validateMsg}</span>}
        </div>
        <div className="btn">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
