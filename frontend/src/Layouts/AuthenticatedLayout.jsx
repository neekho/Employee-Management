import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content-container">{children}</div>
      <Footer />
    </>
  );
};

export default AuthenticatedLayout;
