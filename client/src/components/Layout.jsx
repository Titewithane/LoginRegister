import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style/Layout.css";

function Layout() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="Layout">
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
              <span id="logout">logout</span>
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
      <Outlet />
    </div>
  );
}

export default Layout;
