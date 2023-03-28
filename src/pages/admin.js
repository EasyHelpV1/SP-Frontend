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
import "./admin.css";

const admin = () => {
  return (
    <div className="bg">
      <Navbar />
      <div className="container adminOptions">
        <h2>Admin Interface</h2>
      </div>
      <Footer />
    </div>
  );
};

export default admin;
