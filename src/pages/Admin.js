/*jshint esversion: 8*/
import { React, useState } from "react";
//components
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import ResetUserPass from "../components/adminOptions/ResetUserPass";
import DeleteUser from "../components/adminOptions/DeleteUser";
import DeletePost from "../components/adminOptions/DeletePost";
import EditUser from "../components/adminOptions/EditUser";
//css
import "./Admin.css";

const Admin = () => {
  const [currentForm, setCurrentForm] = useState("");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div className="bg">
      <Navbar />
      <div className="container adminOptions">
        <div className="options-menu">
          <h2>Admin Actions</h2>

          <ul>
            <li
              className="ad-options"
              onClick={() => {
                toggleForm(<ResetUserPass />);
              }}
            >
              Reset User Password
            </li>
            <li
              className="ad-options"
              onClick={() => {
                toggleForm(<EditUser />);
              }}
            >
              Edit User
            </li>
            <li
              className="ad-options"
              onClick={() => {
                toggleForm(<DeleteUser />);
              }}
            >
              Delete User
            </li>
            <li
              className="ad-options"
              onClick={() => {
                toggleForm(<DeletePost />);
              }}
            >
              Delete Post
            </li>
          </ul>
        </div>
        <div className="display-form">{currentForm}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
