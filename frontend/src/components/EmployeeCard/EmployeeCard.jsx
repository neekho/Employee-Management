import React from "react";
import { Link } from "react-router-dom";

// import apiService from "../../apiService";

// const allEmployees = async () => {

//   try {

//       const response = await apiService.get("/employee/employees", {
//         data: { accessToken: localStorage.getItem("accessToken") }, // Send refresh token (if applicable)
//       });

//       console.log(response.data);

//       return response.data

//   } catch (error) {
//     console.error("Logout error:", error);
//   }

// };

// deconstructuring of objects
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
          <Link className="bg-yellow-500 p-3 rounded-md" to={`/edit/${_id}`}>
            Edit
          </Link>
          <Link className="bg-red-500 p-3 rounded-md" to={`/delete/${_id}`}>
            Delete
          </Link>
        </td>
      </tr>
    </>
  );
};

export default EmployeeCard;
