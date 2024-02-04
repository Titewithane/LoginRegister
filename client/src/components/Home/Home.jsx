import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../Layout/Layout";
import "./Home.css";
import axios from "axios";
import api from "../../utils/api";
import React from "react";

function Home() {
  return (
    <div className="Home">
      <div className="Layout">
        <Layout />
      </div>
      <div className="Home">
        <h2>Home</h2>
      </div>
    </div>
  );
}

export default Home;
