/* jshint esversion: 8 */
import { React } from "react";
import { NavLink as Link } from "react-router-dom";
import AdminRoute from "../../util/AdminRoute";

const AdminPopUp = () => {
  return (
    <AdminRoute>
      <div className="AdminPopUp">
        <Link to="/admin">Admin Actions</Link>
      </div>
    </AdminRoute>
  );
};

export default AdminPopUp;
