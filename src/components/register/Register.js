/* jshint esversion: 8 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import globalVars from "../../globalVars";

const Register = (props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [email, setEmail] = useState("");
  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isValidPass, setIsValidPass] = useState(false);

  // //register works
  // const userRegistered = (data) => {
  //   // localStorage.setItem("user", JSON.stringify(data.user));
  //   // localStorage.setItem("token", data.token);
  // };

  const validPass = (isIt) => {
    setIsValidPass(isIt);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isValidPass) {
      const user = { firstN, lastN, birthDate, email, phone, password };

      try {
        const response = await fetch(`${globalVars.PORT}/auth/register`, {
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
        setSuccess("User registered, redirecting...");
        setTimeout(() => {
          setError(null);
          // userRegistered(result);
          navigate("/allPosts");
        }, 5000);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log(isValidPass);
    }
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
            required
          />
          <input
            value={lastN}
            onChange={(e) => setLastN(e.target.value)}
            type="text"
            id="lastN"
            placeholder="Last Name"
            required
          />
          <input
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            type="date"
            id="birthDate"
            placeholder="Birth Date"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="youremail@example.com"
            required
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            id="phone"
            placeholder="0123456789"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="password"
            required
          />
          <input
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            type="password"
            id="passwordAgain"
            placeholder="confirm password"
            required
          />
          <div id="passError">
            <PasswordChecklist
              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "match",
                "lowercase",
              ]}
              minLength={5}
              value={password}
              valueAgain={passwordAgain}
              onChange={(isValid) => {
                validPass(isValid);
              }}
            />
          </div>
          <div className="form-btns">
            <button className="register-btn">Register</button>
            <button
              className="login-btn"
              onClick={() => props.onFormSwitch("login")}
            >
              Log in
            </button>
          </div>
          {!loading && error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </div>
      </form>
    </div>
  );
};

export default Register;
