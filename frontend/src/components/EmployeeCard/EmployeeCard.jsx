import React from "react";
import { Link } from "react-router-dom";

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
