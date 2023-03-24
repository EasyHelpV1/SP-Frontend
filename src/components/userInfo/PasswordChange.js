/* jshint esversion: 8 */
import { React, useState } from "react";
import PasswordChecklist from "react-password-checklist";
import globalVars from "../../globalVars";

const PasswordChange = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isValidPass, setIsValidPass] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validPass = (isIt) => {
    setIsValidPass(isIt);
  };

  const changePass = async (e) => {
    e.preventDefault();
    if (isValidPass) {
      const userPasses = { oldPassword, newPassword };
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${globalVars.PORT}/users/changePassword/${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userPasses),
          }
        );
        let result = await response.json();
        if (!response.ok) {
          throw new Error(`${result.msg}`);
        }
        setSuccess("Change password success, redirecting...");
        setTimeout(() => {
          setError(null);
          localStorage.clear();
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
    <div className="options">
      <div className="info-field-header">
        <h2>Change Password</h2>
      </div>
      <form onSubmit={changePass}>
        <div className="info-field">
          <p className="a-field">Old Password</p>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter a password"
          />
        </div>
        <div className="info-field">
          <p className="a-field">New Password</p>
          <input
            type="password"
            value={newPassword}
            id="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter a password"
          />
        </div>
        <div className="info-field">
          <p className="a-field">Confirm Password</p>
          <input
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            type="password"
            id="passwordAgain"
            placeholder="password"
          />
        </div>
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
            value={newPassword}
            valueAgain={passwordAgain}
            onChange={(isValid) => {
              validPass(isValid);
            }}
          />
        </div>
        <button>Save Password</button>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
      </form>
    </div>
  );
};

export default PasswordChange;
