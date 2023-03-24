/* jshint esversion: 8 */
import React, { useState } from "react";
// components
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Navbar from "../components/navbar/Navbar";
// css
import "./auth.css";

const Auth = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <section id="auth">
      <Navbar />
      <div className="container auth">
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )}
      </div>
    </section>
  );
};

export default Auth;
