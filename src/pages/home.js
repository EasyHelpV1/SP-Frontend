/* jshint esversion: 8 */
import React from "react";
import { useNavigate } from "react-router-dom";
// components
import ppl from "../assets/ppl.png";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
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
        {/* <div className="info-register">
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
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </div>
        </div> */}

        <div className="info-social"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
