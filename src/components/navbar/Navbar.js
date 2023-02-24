/* jshint esversion: 8 */
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaRegHandshake } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import "../UI/button/Button.css";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import userLoggedOut from "./logOut";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [showMenu, setShowMenu] = useState(false);

  // const toggleMenu = () => {
  //   setShowMenu(!showMenu);
  // };

  return (
    <nav className="container navbar">
      <NavLink to="/">
        <div className="logo">
          <p className="logo-text">EasyHelp</p>
          <FaRegHandshake color="#BBEDFD" size={40} />
        </div>
      </NavLink>
      <Nav>
        {token ? (
          <NavMenu>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/allPosts">Posts</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink onClick={(e) => userLoggedOut()} to="/">
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
