import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const GuestLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content-background">
        <div className="content-container">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default GuestLayout;
