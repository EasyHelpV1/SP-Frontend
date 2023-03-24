/*jshint esversion: 8*/
import React from "react";
import "./Footer.css";
import { FaRegHandshake } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-first">
        <a href="#">&bull; About</a>
        <a href="#">&bull; Contact</a>
        <a href="#">&bull; Documentation</a>
      </div>
      <div className="footer-second">
        <p>&bull; EasyHelp@gmail.com</p>
        <p>&bull; +1 563 123 4567</p>
        <p>&bull; 700 College Dr, Decorah IA</p>
      </div>
      <div className="footer-third">
        <div className="logo">
          <p className="logo-text">Easy Help</p>
          <FaRegHandshake color="#BBEDFD" size={40} />
        </div>
        <p>&copy; Copyright 2021 EasyHelp.com</p>
      </div>
    </div>
  );
};

export default Footer;
