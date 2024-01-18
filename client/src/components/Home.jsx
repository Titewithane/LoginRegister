import { useState, useEffect } from "react";
import "./style/Home.css";

function Home() {
  useEffect(() => {
    fetch("http://localhost:5000/", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => console.log(data.msg))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      <h1>hi</h1>
    </div>
  );
}

export default Home;
