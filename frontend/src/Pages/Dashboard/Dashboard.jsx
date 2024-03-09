import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Layouts
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

// Components
import EmployeeCard from "../../Components/EmployeeCard/EmployeeCard.jsx";

import { useNavigate } from "react-router-dom";

import apiService from "../../apiService.js";
import authInterceptor from "../../authInterceptor.js";

import "./Dashboard.css";
import data from "./Data.js";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiService.get("/employee/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        console.log(`${localStorage.getItem("accessToken")}`);
        console.log(localStorage.getItem("refreshToken"));

        // Update the state with the response data
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    // Call the function to fetch employees
    fetchEmployees();
  }, []); // Empty dependency array to ensure the effect runs only once

  const handleLogout = async () => {
    try {
      // 1. Remove tokens from localStorage:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // 2. (Optional) Call the backend logout API:
      const response = await apiService.delete("/logout", {
        data: { refreshToken: localStorage.getItem("refreshToken") }, // Send refresh token (if applicable)
      });

      // Handle successful backend response (if used):
      console.log("Logout successful:", response.data);

      // 3. Redirect to login page:
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle errors appropriately (e.g., display user-friendly message)
    }
  };

  function displayEmployees(info, index) {
    return <EmployeeCard key={index} {...info} />;
  }

  return (
    <AuthenticatedLayout>
      <div className="table-container">
        <div className="table-control">
          <Link to="/new" className="table-adduser">
            Add User
          </Link>

          <Link to="/login" className="table-adduser" onClick={handleLogout}>
            Logout
          </Link>
        </div>

        <table className="w-full bg-[#181818]">
          <thead className="table-header">
            <tr className="">
              <th>Full Name</th>
              <th>Contact No.</th>
              <th>Role</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {employees.map((employee, index) => (
              <EmployeeCard key={index} {...employee} />
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
