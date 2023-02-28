/* jshint esversion: 8 */
import { React, useState } from "react";

const PasswordChange = ({ user }) => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const token = localStorage.getItem("token");

  const changePass = async (e) => {
    e.preventDefault();
    const userPasses = { oldPassword, newPassword };
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/changePassword/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(userPasses),
        }
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      // let userData = await response.json();
      // setUserCopy(userData);
      // setError(null);
    } catch (err) {
      setError(err.message);
      // setUser(null);
    } finally {
      setLoading(false);
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="options">
      <form onSubmit={changePass}>
        <h2>Change Password</h2>
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
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter a password"
          />
        </div>
        {/* <div className="info-field">
          <p className="a-field">Re-enter New Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password"
          />
        </div> */}
        <button>Save Password</button>
      </form>
    </div>
  );
};

export default PasswordChange;
