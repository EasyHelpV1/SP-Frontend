/* jshint esversion: 8 */
import React, { useEffect, useState } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import AdminPopUp from "../adminOptions/AdminPopUp";
import { RiCloseLine } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";

const Nav = styled.nav``;
const NavLink = styled(Link)``;
const NavMenu = styled.div``;

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setLoading(false);
  }, []);

  const userLoggedOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload(false);
  };

  if (!loading) {
    return (
      <nav className="container navbar">
        <NavLink to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
            {/* <p className="logo-text">Easy Help</p>
            <FaRegHandshake color="#BBEDFD" size={40} /> */}
          </div>
        </NavLink>
        <AdminPopUp />
        <Nav id={showMenu ? "nav-small" : "nav-big"}>
          {token ? (
            <NavMenu>
              <NavLink to="/">Home</NavLink>

              <NavLink to="/allPosts">Posts</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink onClick={userLoggedOut} to="/">
                Logout
              </NavLink>
            </NavMenu>
          ) : (
            <NavMenu>
              {/* <a href="/">Home</a>
              <a href="#about">About</a>
              <a href="#how-to">How To</a>
              <a href="/auth">Login/Register</a> */}
              <NavLink to="/">Home</NavLink>
              <NavLink
                to="/#about"
                onClick={() => {
                  const anchor = document.querySelector("#about");
                  anchor.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                About
              </NavLink>
              <NavLink
                to="/#how-to"
                onClick={() => {
                  const anchor = document.querySelector("#how-to");
                  anchor.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                How To
              </NavLink>
              <NavLink to="/auth">Login/Register</NavLink>
            </NavMenu>
          )}
        </Nav>
        <div className="menu-icons" onClick={toggleMenu}>
          {showMenu ? (
            <RiCloseLine color="#fff" size={30} />
          ) : (
            <AiOutlineMenu color="#fff" size={27} />
          )}
        </div>
      </nav>
    );
  } else {
    return <div className="loading-div">Loading...</div>;
  }
};

export default Navbar;
