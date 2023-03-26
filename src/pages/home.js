/* jshint esversion: 8 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

// components
import ppl from "../assets/ppl.png";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Features from "../components/features/Features";
// css
import "./home.css";

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
          <div className="left">
            <div className="text">
              <h1>Communicate and Help</h1>
              <h2>A space for cooperation</h2>
              <p>
                Easy Help is a platform that allows you to communicate with
                others and get assistance in achieving small easy tasks that
                require an extra hand.
              </p>
              <form>
                <button onClick={handleClick}>Register Now!</button>
              </form>
            </div>
          </div>
          <div className="right">
            <img src={ppl} alt="image of people helping" />
          </div>
        </div>
        <div className="howto-info">
          <Features />
        </div>

        <div className="info-social">
          <h1>Contact Us!</h1>
          <div className="links">
            <a href="Gmail.com">
              <SiGmail color="#101330" size={40} />
            </a>
            <a href="facebook.com">
              <FaFacebookSquare color="#101330" size={40} />
            </a>
            <a href="instagram.com">
              <FaInstagramSquare color="#101330" size={40} />
            </a>
            <a href="twitter.com">
              <FaTwitterSquare color="#101330" size={40} />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
