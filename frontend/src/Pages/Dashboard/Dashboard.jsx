import React from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Link } from "react-router-dom";
import EmployeeCard from "../../Components/EmployeeCard/EmployeeCard.jsx";
import "./Dashboard.css";
import data from "./Data.js";

const Dashboard = () => {
  function displayEmployees(info, index) {
    return <EmployeeCard key={index} {...info} />;
  }

  return (
    <AuthenticatedLayout>
      <div className="table-container">
        <div className="table-control">
          <Link to="/register" className="table-adduser">
            Add User
          </Link>
        </div>

        <table className="w-full bg-[#181818]">
          <thead className="table-header">
            <tr className="">
              <th>Fullname</th>
              <th>Contact No.</th>
              <th>Role</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-body">{data.map(displayEmployees)}</tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
