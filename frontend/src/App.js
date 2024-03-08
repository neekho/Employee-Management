import React from "react";

// Pages
import AccountCreation from "./Pages/AccountCreation/AccountCreation";
import Login from "./Pages/Login/Login";
import RegisterEmployee from "./Pages/AdminRegister/AdminRegister";
import Dashboard from "./Pages/Dashboard/Dashboard";

// Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<AccountCreation />} />

          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<RegisterEmployee />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
