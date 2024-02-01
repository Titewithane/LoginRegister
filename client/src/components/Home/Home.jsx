import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../Layout/Layout";
import "./Home.css";
import axios from "axios";
import api from "../../utils/api";
import React from "react";

function Home() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    localStorage.getItem("token") ? setIsLogin(true) : setIsLogin(false);
  }, []);

  return (
    <React.Fragment>
      <div className="Layout">
        <Layout isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
      <div className="Home">
        <h2>Home</h2>
      </div>
    </React.Fragment>
  );
}

export default Home;
