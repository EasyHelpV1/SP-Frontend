/*jshint esversion: 8*/
import { React, useState } from "react";
//components
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import ResetUserPass from "../components/adminOptions/ResetUserPass";
import DeletePost from "../components/adminOptions/DeletePost";
import FindUser from "../components/adminOptions/FindUser";
import AddAdmin from "../components/adminOptions/AddAdmin";
import RemoveAdmin from "../components/adminOptions/RemoveAdmin";
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
                toggleForm(<AddAdmin />);
              }}
            >
              Promote User to Admin
            </li>
            <li
              className="ad-options"
              onClick={() => {
                toggleForm(<RemoveAdmin />);
              }}
            >
              Remove Admin Privileges
            </li>
            <li
              className="ad-options"
              onClick={() => {
                toggleForm(<FindUser />);
              }}
            >
              Edit User
            </li>
            {/* <li
              className="ad-options"
              onClick={() => {
                toggleForm(<DeleteUser />);
              }}
            >
              Delete User
            </li> */}
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
        <div className="display-form">
          {currentForm ? currentForm : <h1>Choose a form to display</h1>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
