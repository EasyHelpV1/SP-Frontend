/* jshint esversion: 8 */
import { React, useState, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminPopUp = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const adminAuth = () => {
      const userToken = localStorage.getItem("token");
      if (!userToken || userToken === "undefined") {
        setIsAdmin(false);
        return;
      }
      const payload = jwtDecode(userToken);
      if (payload.role !== "admin") {
        setIsAdmin(false);
        return;
      }
      setIsAdmin(true);
    };
    adminAuth();
  }, [isAdmin]);

  return (
    <div>
      {isAdmin ? (
        <div className="AdminPopUp">
          <Link to="/admin">Admin Actions</Link>
        </div>
      ) : null}
    </div>
  );
};

export default AdminPopUp;
