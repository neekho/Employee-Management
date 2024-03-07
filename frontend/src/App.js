import React from "react";

import Login from "./Pages/Login/Login";
import RegisterEmployee from "./Pages/AdminRegister/AdminRegister";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterEmployee />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
