import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  console.log("EMPLOYEE DATA", employeeData);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await apiService.get(`/employee/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }); // Fetch employee details

        setEmployeeData(response.data); // Set initial values for form
        console.log("RESPONSE DATA: ", response.data);
      } catch (err) {
        console.log(employeeId);
        console.error("Error fetching employee data:", err);
      }
    };

    if (employeeId) {
      // Ensure employeeId exists before fetching
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
