import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="shadow-xl bg-[#181818] text-white">
      <div className="navbar">
        <Link to="/" className="logo">
          CompanyName
        </Link>
        <div className="nav-links">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
