/* jshint esversion: 8 */
import React, { useState } from "react";
import globalVars from "../../globalVars";

const RemoveAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [email, setEmail] = useState("");

  const handleRemoveAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${globalVars.PORT}/admin/RemoveAdmin/${email}`,
        {
          method: "PATCH",
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
      setSuccess("Admin privileges removed successfully");
      setError(null);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container RemoveAdmin">
      <h2>Remove Admin Privilege</h2>
      <form onSubmit={handleRemoveAdmin}>
        <div className="form-control">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="useremail@example.com"
            required
          />
          <button className="submit-btn">Remove Admin</button>

          {!loading && error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </div>
      </form>
    </div>
  );
};

export default RemoveAdmin;
