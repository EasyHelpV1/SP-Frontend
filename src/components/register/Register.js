import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userRegistered from "./registered";
import "./Register.css";

const Register = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const user = { firstN, lastN, email, password };
    fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((json) => userRegistered(json))
      .catch((error) => console.log(error));
    navigate("/allPosts");
  };

  return (
    <div className="container register">
      <h2>Get Started, Register now!</h2>
      <form onSubmit={handleRegister}>
        <div className="form-control">
          <input
            value={firstN}
            onChange={(e) => setFirstN(e.target.value)}
            type="text"
            id="firstN"
            placeholder="First Name"
          />
          <input
            value={lastN}
            onChange={(e) => setLastN(e.target.value)}
            type="text"
            id="lastN"
            placeholder="Last Name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="youremail@example.com"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="password"
          />
          <button>Register</button>
          <button onClick={() => props.onFormSwitch("login")}>Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
