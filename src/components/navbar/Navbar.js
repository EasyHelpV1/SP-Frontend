/* jshint esversion: 8 */

import React, { useState } from "react";
import "./Navbar.css";
import { FaRegHandshake } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import "../UI/button/Button.css";
import { Nav, NavLink, NavMenu } from "./NovnarElements";
import userLoggedOut from "./logOut";

const Navbar = ({ logIn, logOut }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <nav className="container navbar">
      <div className="logo">
        <p className="logo-text">EasyHelp</p>
        <FaRegHandshake color="#ffc47d" size={40} />
      </div>
      <Nav>
        <NavMenu>
          {/* <NavLink to="/allPosts" activeStyle>
            All Posts
          </NavLink>
          <NavLink to="/createPost" activeStyle>
            Create Post
          </NavLink> */}
          {/* <NavLink to="/auth" activeStyle>
            Login
          </NavLink> */}
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
