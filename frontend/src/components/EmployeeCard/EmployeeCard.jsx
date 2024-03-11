import React, {useEffect, useState} from "react";


import apiService from "../../apiService";

const handleDelete = async (_id) => {


  if (window.confirm(`Are you sure you want to delete this employee? ${_id}`)) {
    try {
      const response = await apiService.delete(`/employee/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });


      console.log(localStorage.getItem("accessToken"));

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
          <button className="bg-yellow-500 p-3 rounded-md">
            Edit
          </button>
          <button
            className="bg-red-500 p-3 rounded-md"
      
            onClick={() => handleDelete(_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default EmployeeCard;
