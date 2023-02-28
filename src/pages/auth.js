/* jshint esversion: 8 */
import React, { useState } from "react";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Navbar from "../components/navbar/Navbar";
import "./auth.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";

const Auth = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <section id="auth">
      {/* <Navbar /> */}
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

//page for authentication elements
