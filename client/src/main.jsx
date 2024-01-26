import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Register from "./components/Register";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // root element always render with children components
    errorElement: <ErrorPage />, // handling status 404
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
