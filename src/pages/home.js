/* jshint esversion: 8 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { FiArrowDown } from "react-icons/fi";
import { FiArrowUp } from "react-icons/fi";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

// components
import ppl from "../assets/ppl.png";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import HowTo from "../components/home/HowTo";
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
        <div className="info-register" id="info-register">
          <div className="left">
            <div className="text">
              <h1>Communicate and Help</h1>
              <h2 id="home">A space for cooperation</h2>
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
          <div className="go-down">
            <a href="#about">
              <FiArrowDown size={50} color="white" />
            </a>
          </div>
        </div>
        <div className="info-howto" id="about">
          <HowTo />
        </div>

        <div className="info-social">
          <h1>Contact Us!</h1>
          <div className="links">
            <a href="mailto:email@easyhelp.com" id="gmail-link">
              <SiGmail color="#101330" size={40} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100092154781925"
              target="_blank"
              id="facebook-link"
            >
              <FaFacebookSquare color="#101330" size={40} />
            </a>
            <a
              href="https://www.instagram.com/easyhelpv1"
              target="_blank"
              id="instagram-link"
            >
              <FaInstagramSquare color="#101330" size={40} />
            </a>
          </div>
        </div>
        <div className="go-up">
          <a href="#info-register">
            <FiArrowUp size={50} color="black" />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
