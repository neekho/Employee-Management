import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./employeeApiSlice";

const Employee = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/employee/update/${userId}`);

    return (
      <tr className="">
        <td>
          {user.firstName} {user.lastName}
        </td>
        <td>{user.contactNumber}</td>
        <td>{user.position}</td>
        <td>{user.department}</td>

        <td className="space-x-2">
          <Link
            onClick={handleEdit}
            className="bg-yellow-500 p-3 rounded-md"
            to={`/employee/update/${user._id}`}
          >
            Edit
          </Link>
          <Link
            className="bg-red-500 p-3 rounded-md"
            to={`/employee/update/delete/${user._id}`}
          >
            Delete
          </Link>
        </td>
      </tr>
    );
  } else return null;
};
export default Employee;
