/*jshint esversion: 8*/
import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-first">
        <a href="#how-to">&bull; About</a>
        <a href="#about">&bull; Contact</a>
        <a href="#about">&bull; Documentation</a>
      </div>
      <div className="footer-second">
        <p>&bull; EasyHelp@gmail.com</p>
        <p>&bull; +1 563 123 4567</p>
        <p>&bull; 700 College Dr, Decorah IA</p>
      </div>
      <div className="footer-third">
        <div className="logo">
          <img src={logo} alt="logo" />

          {/* <p className="logo-text">Easy Help</p>
          <FaRegHandshake color="#BBEDFD" size={40} /> */}
        </div>
        {/* <p>&copy; Copyright 2021 EasyHelp.com</p> */}
      </div>
    </div>
  );
};

export default Footer;
