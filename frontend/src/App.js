import React, { useEffect } from "react";

// Pages
import AccountCreation from "./Pages/AccountCreation/AccountCreation";
import Login from "./Pages/Login/Login";
import RegisterEmployee from "./Pages/AdminRegister/AdminRegister";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UpdateEmployee from "./Pages/UpdateEmployee/UpdateEmployee";

// Routing and redirecting
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

// Access token handling
import authInterceptor from "./authInterceptor";

const App = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      authInterceptor(accessToken);
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          {!localStorage.getItem("accessToken") && (
            <Route path="/dashboard" element={<Login />} />
          )}
          <Route path="/register" element={<AccountCreation />} />

          <Route path="/" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}

          <Route path="/new" element={<RegisterEmployee />} />

          <Route
            path="/update-employee/:employeeId"
            element={<UpdateEmployee />}
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
