import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./style/Home.css";
import axios from "axios";

function Home() {
  // const location = useLocation();
  // const token = location.state ? location.state.token : null;
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  useEffect(() => {
    const isTokenExpired = () => {};
  }, [token]);

  const handleSubmit = async (evt) => {
    //!==========================================
    //! use fetch to send req to API
    //!==========================================
    // fetch("http://localhost:5000/product", {
    // method: "GET",
    // mode: "cors", //* It isn't necessary
    // credentials: "include", //* It is not necessary
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    //*============================================
    //* use axios to send req to API
    //*============================================
    const res = await axios.get("http://localhost:5000/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
  };

  return (
    <div className="home">
      <h2>Home</h2>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default Home;
