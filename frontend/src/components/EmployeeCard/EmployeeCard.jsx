import React from "react";
import { Link } from "react-router-dom";

import apiService from "../../apiService";

const handleDelete = async (id) => {
  if (window.confirm(`Are you sure you want to delete this employee? ${id}`)) {
    try {
      const response = await apiService.get(`/employee/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });


      

      console.log(response.data);
      console.log('user deleted')
    } 
    
    catch (err) {
       console.log('error in deleting employee', err)

    }
  }
};

const EmployeeCard = ({
  _id,
  firstName,
  lastName,
  contactNumber,
  position,
  department,
  active,
}) => {
  return (
    // Your existing code
    <>
      <tr className="">
        <td>
          {firstName} {lastName}
        </td>
        <td>{contactNumber}</td>
        <td>{position}</td>
        <td>{department}</td>

        {/* <td>{active ? "Active" : "Inactive"}</td> */}

        <td className="space-x-2">
          {/* string formmating */}
          <Link className="bg-yellow-500 p-3 rounded-md" to={`employee/edit/${_id}`}>
            Edit
          </Link>
          <Link
            className="bg-red-500 p-3 rounded-md"
            to={`employee/delete/${_id}`}
            onClick={() => handleDelete(_id)}
          >
            Delete
          </Link>
        </td>
      </tr>
    </>
  );
};

export default EmployeeCard;
