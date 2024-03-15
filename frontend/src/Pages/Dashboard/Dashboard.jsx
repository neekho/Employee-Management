import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Layouts
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

// Components
import EmployeeCard from "../../Components/EmployeeCard/EmployeeCard.jsx";

import { useNavigate } from "react-router-dom";

import apiService from "../../apiService.js";

import "./Dashboard.css";

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

        // Update the state with the response data
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    // Call the function to fetch employees
    console.log("DASHBOARD LOG");
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
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="table-container">
        <div className="table-control">
          <Link to="/register" className="table-adduser">
            New Admin
          </Link>

          <Link to="/new" className="table-adduser">
            Add User
          </Link>

          <Link to="/" className="table-adduser" onClick={handleLogout}>
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
