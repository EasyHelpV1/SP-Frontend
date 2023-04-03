/* jshint esversion: 8 */
import { React, useState } from "react";
import EditUser from "./EditUser";
import globalVars from "../../globalVars";

const FindUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userEmail, setUserEmail] = useState("");

  const [userInfo, setUserInfo] = useState("");
  const handleFindUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${globalVars.PORT}/admin/FindUser/${userEmail}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      let result = await response.json();
      if (!response.ok) {
        throw new Error(`${result.msg}`);
      }
      setUserInfo(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container EditUser">
      <h2>Enter Email of User to Edit</h2>
      <form onSubmit={handleFindUser}>
        <div className="form-control">
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            type="useremail"
            name="useremail"
            id="useremail"
            placeholder="useremail@example.com"
            required
          />
          <button className="submit-btn">Find User</button>

          {!loading && error && <div className="error-msg">{error}</div>}
        </div>
      </form>
      {userInfo && <EditUser userInfo={userInfo} />}
    </div>
  );
};

export default FindUser;
