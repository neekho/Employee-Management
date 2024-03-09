import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import AccountCreation from "./Pages/AccountCreation/AccountCreation";
import Login from "./Pages/Login/Login";
import RegisterEmployee from "./Pages/AdminRegister/AdminRegister";
import Dashboard from "./Pages/Dashboard/Dashboard";

// Routing and redirecting

import EditUser from "./Pages/employees/EditEmployee";
import EmployeesList from "./Pages/employees/EmployeesList";

import Prefetch from "./Pages/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />

      <Route element={<Prefetch />} />
      <Route path="/dashboard" element={<EmployeesList />} />

      <Route path="employees">
        <Route index element={<EmployeesList />} />
        {/* <Route path="update/:id" element={<EditEmployee />} />
        <Route path="/new" element={<NewUserForm />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
