/* jshint esversion: 8 */
import React, { useState } from "react";
import globalVars from "../../globalVars";

const AddAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [email, setEmail] = useState("");

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${globalVars.PORT}/admin/AddAdmin/${email}`,
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
      setSuccess("User added as an admin successfully");
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
    <div className="container AddAdmin">
      <h2>Promote User to an Admin</h2>
      <form onSubmit={handleAddAdmin}>
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
          <button className="submit-btn">Add Admin</button>

          {!loading && error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
