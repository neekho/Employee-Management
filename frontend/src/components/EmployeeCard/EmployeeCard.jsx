import React from "react";
import { Link } from "react-router-dom";
// deconstructuring of objects
const EmployeeCard = ({
  id,
  firstname,
  lastname,
  contactNo,
  role,
  department,
}) => {
  return (
    <>
      <tr className="">
        <td>
          {firstname} {lastname}
        </td>
        <td>{contactNo}</td>
        <td>{role}</td>
        <td>{department}</td>
        <td className="space-x-2">
          {/* string formmating */}
          <Link className="bg-yellow-500 p-3 rounded-md" to={`/edit/${id}`}>
            Edit
          </Link>
          <Link className="bg-red-500 p-3 rounded-md" to={`/delete/${id}`}>
            Delete
          </Link>
        </td>
      </tr>
    </>
  );
};

export default EmployeeCard;
