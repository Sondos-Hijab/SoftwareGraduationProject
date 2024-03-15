import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";
import AuthLayout from "./auth_pages/AuthLayout.jsx";
import SigninForm from "./auth_pages/pages/Signin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthLayout />
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>
);
