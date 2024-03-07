import React from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <FontAwesomeIcon icon={faGoogle} />
      </div>
      <div className="links space-x-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
