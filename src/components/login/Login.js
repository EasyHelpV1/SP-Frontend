/* jshint esversion: 8 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalVars from "../../globalVars";

const Login = (props) => {
  //consts
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //login works
  const userLoggedIn = (data) => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

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
      setSuccess("Login successful, redirecting...");
      userLoggedIn(result);
      setTimeout(() => {
        setError(null);
        navigate("/allPosts");
      }, 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(function () {
        localStorage.clear();
      }, 60 * 60 * 1000); // login expires in 24hrs
    }
  };

  return (
    <div className="container login">
      <h2>Log in to your account</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@example.com"
            required
          />
          <input
            id="password"
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
          {!loading && error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </div>
      </form>
    </div>
  );
};

export default Login;
