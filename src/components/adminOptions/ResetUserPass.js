/* jshint esversion: 8 */
import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import globalVars from "../../globalVars";

const ResetUserPass = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isValidPass, setIsValidPass] = useState(false);

  const validPass = (isIt) => {
    setIsValidPass(isIt);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (isValidPass) {
      const userInfo = { email, birthDate, password };
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${globalVars.PORT}/admin/ResetUserPassword`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userInfo),
          }
        );
        let result = await response.json();
        if (!response.ok) {
          throw new Error(`${result.msg}`);
        }
        setSuccess("Change password success");
        setTimeout(() => {
          setError(null);
          window.location.reload();
        }, 5000);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("You did not enter a new valid password.");
    }
  };

  return (
    <div className="container ResetuserPass">
      <h2>Reset User Password</h2>
      <form onSubmit={handleReset}>
        <div className="form-control">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="useremail@example.com"
            required
          />
          <p className="user-birth">User birth date:</p>
          <input
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            type="date"
            id="birthDate"
            placeholder="Birth Date"
            required
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
          <button className="submit-btn">Submit</button>

          {!loading && error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </div>
      </form>
    </div>
  );
};

export default ResetUserPass;
