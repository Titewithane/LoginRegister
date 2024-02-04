import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

function Layout() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") ? setIsLogin(true) : setIsLogin(false);
  }, []);

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
  };

  return (
    <div className="navbar">
      <div className="web-name">
        <span></span>
      </div>
      <div className="link">
        <Link to={""}>
          <span id="about">about</span>
        </Link>
        <Link to={""}>
          <span id="service">service</span>
        </Link>
        {isLogin ? (
          <Link to={""}>
            <button onClick={Logout}>
              <span id="logout">logout</span>
            </button>
          </Link>
        ) : (
          <>
            <Link to={"/register"}>
              <span id="register">register</span>
            </Link>
            <Link to={"/login"}>
              <span id="login">login</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Layout;
