import React from "react";
import "./Footer.css";
const Footer = () => {
  const date = new Date();

  return (
    <footer className="bg-[#181818] text-white">
      <div className="footer">
        <div className="company-name">
          <h1 className="">
            Nikho <span>&copy; {date.getFullYear()}</span>
          </h1>
        </div>
        <div className="footer-links">
          <a href="">Contact</a>
          <a href="">About Me</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
