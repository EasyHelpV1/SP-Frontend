/* jshint esversion: 8 */
import React, { useEffect, useState } from "react";
import { FaRegHandshake } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import "./Navbar.css";

const Nav = styled.nav``;
const NavLink = styled(Link)``;
const NavMenu = styled.div``;

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

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
            <p className="logo-text">Easy Help</p>
            <FaRegHandshake color="#BBEDFD" size={40} />
          </div>
        </NavLink>
        <Nav>
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
              <NavLink to="/">Home</NavLink>
              <NavLink to="#about">About</NavLink>
              <NavLink to="#how-to">How To</NavLink>
              <NavLink to="/auth">Login/Register</NavLink>
            </NavMenu>
          )}
        </Nav>
      </nav>
    );
  } else {
    return <div className="loading-div">Loading...</div>;
  }
};

export default Navbar;
