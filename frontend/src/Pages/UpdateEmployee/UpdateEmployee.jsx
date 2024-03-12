import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

import ReusableForm from "../../Components/ReusableForm/ReusableForm";

import apiService from "../../apiService";

const UpdateEmployee = () => {
  const { employeeId } = useParams(); // Get the employee ID from route parameter
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    position: "",
    department: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await apiService.get(`/employee/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setEmployeeData(response.data); // Set initial values for form
        console.log("RESPONSE DATA: ", response.data);
      } catch (err) {
        console.log(employeeId);
        console.error("Error fetching employee data:", err);
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]); // Dependency array to fetch only once

  const handleUpdate = async (employeeData) => {
    try {
      const response = await apiService.put(
        `/employee/update/${employeeId}`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      navigate("/dashboard");
      console.log("Employee updated successfully:", response.data);
    } catch (err) {
      console.error("Error in updating employee", err);
    }
  };

  return (
    <AuthenticatedLayout>
      <ReusableForm
        title={"Update Employee"}
        btnText={"Update"}
        onSubmit={handleUpdate}
        initialValues={{
          ...employeeData,
        }}
      />
    </AuthenticatedLayout>
  );
};

export default UpdateEmployee;
