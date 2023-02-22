/* jshint esversion: 8 */

import React, { useState } from "react";
import "./Navbar.css";
import { FaRegHandshake } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import "../UI/button/Button.css";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import userLoggedOut from "./logOut";

const Navbar = ({ logIn, logOut, profile, posts }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <nav className="container navbar">
      <NavLink to="/" activeStyle>
        <div className="logo">
          <p className="logo-text">EasyHelp</p>
          <FaRegHandshake color="#BBEDFD" size={40} />
        </div>
      </NavLink>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          {posts ? (
            <NavLink to="/allPosts" activeStyle>
              Posts
            </NavLink>
          ) : null}
          {profile ? (
            <NavLink to="/profile" activeStyle>
              Profile
            </NavLink>
          ) : null}
          {logIn ? (
            <NavLink to="/auth" activeStyle>
              Login
            </NavLink>
          ) : null}
          {logOut ? (
            <NavLink onClick={(e) => userLoggedOut()} to="/" activeStyle>
              Logout
            </NavLink>
          ) : null}
        </NavMenu>
      </Nav>

      {/* <div className="menu-icons" onClick={toggleMenu}>
        {showMenu ? (
          <RiCloseLine color="#ffc47d" size={30} />
        ) : (
          <AiOutlineBars color="#ffc47d" size={30} />
        )}
      </div> */}
    </nav>
  );
};

export default Navbar;
