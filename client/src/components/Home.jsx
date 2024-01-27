import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style/Home.css";

function Home() {
  // const location = useLocation();
  // const token = location.state ? location.state.token : null;
  const token = localStorage.getItem("jwt");

  const handleSubmit = (evt) => {
    fetch("http://localhost:5000/product", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Authorization: `Bearer <${token}>`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>Home</h2>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default Home;
