import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userLoggedIn from "./loggedIn";
import "./Login.css";

const Login = (props) => {
  //consts
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email);

    const user = { email, password };

    fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((json) => userLoggedIn(json))
      .catch((error) => console.log(error));
    // setTimeout(() => {
    //   navigate("/allPosts");
    // }, 500);
    navigate("/allPosts");
  };

  //return
  return (
    <div className="container login">
      <h2>Log in to your account</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@example.com"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            required
          />
          <div className="form-btns">
            <button className="login-btn">Log in</button>
            <button
              className="register-btn"
              onClick={() => props.onFormSwitch("register")}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
