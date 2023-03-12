/* jshint esversion: 8 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userLoggedIn from "./loggedIn";
import "./Login.css";
import globalVars from "../../globalVars";

const Login = (props) => {
  //consts
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await fetch(`${globalVars.PORT}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let result = await response.json();
      if (!response.ok) {
        throw new Error(`${result.msg}`);
      }
      // let userData = await response.json();
      userLoggedIn(result);
      setError(null);
      navigate("/allPosts");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          {error && <div className="error-msg">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Login;
