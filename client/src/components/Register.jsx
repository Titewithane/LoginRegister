import { useState } from "react";

function Register() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [msg, setMsg] = useState("");

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
    FormData.password === FormData.rePassword && evt.consume();

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
        setMsg(data.msg);
        data.msg === "Username is already used." &&
          setFormData({
            username: "",
            password: "",
            rePassword: "",
          });
      });
  };

  return (
    <div>
      <h1>register</h1>
      {msg === "Username is already used." ? <h1>fail</h1> : <h1>success</h1>}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
