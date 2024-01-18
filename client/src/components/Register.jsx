import { useState } from "react";

function Register() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });

  const handleChange = (evt) => {
    const changeField = evt.target.name;
    const newValue = evt.target.value;
    setFormData((curr) => {
      return { ...curr, [changeField]: newValue };
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch("/account", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <h1>register</h1>
      <form>
        <div className="username">
          <input type="text" name="username" placeholder="" />
        </div>
        <div className="password">
          <input type="password" name="password" id="" />
        </div>
        <div className="rePassword">
          <input type="password" name="rePassword" id="" />
        </div>
        <button onSubmit={handleSubmit}>Register</button>
      </form>
    </div>
  );
}

export default Register;
