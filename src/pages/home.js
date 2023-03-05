/* jshint esversion: 8 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import ppl from "../assets/ppl.png";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth");
  };
  return (
    <div className="bg">
      <Navbar />
      <div className="container home">
        <div className="info-register">
          <div className="text">
            <h1>Communicate and Help</h1>
            <h2>A space for cooperation</h2>
            <p>
              Easy Help is a platform that allows you to communicate with others
              and get assistance in achieving small easy tasks that require an
              extra hand.
            </p>
            <form>
              <button onClick={handleClick}>Register Now!</button>
            </form>
          </div>
          <img src={ppl} alt="image of people helping" />
        </div>
        <div className="info-use"></div>
        <div className="info-social"></div>
      </div>
      <Footer />
    </div>
    // <header className="bg">
    //   <Navbar />
    // </header>
  );
};

export default Home;

//main page
