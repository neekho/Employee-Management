import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./employeeApiSlice";
import EditEmployeeForm from "./EditEmployeeForm";

const EditEmployee = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditEmployeeForm user={user} /> : <p>Loading...</p>;

  return content;
};
export default EditEmployee;
