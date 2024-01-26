import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style/Home.css";

function Home() {
  const location = useLocation();
  const token = location.state.token;
  return (
    <div className="home">
      <h1></h1>
      <h2>Home</h2>
    </div>
  );
}

export default Home;
