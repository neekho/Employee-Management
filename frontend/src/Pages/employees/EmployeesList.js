import { useGetUsersQuery } from "./employeeApiSlice";
import Employee from "./Employee";
import { Link } from "react-router-dom";

import "../Dashboard/Dashboard.css";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <Employee key={userId} userId={userId} />)
      : null;

    content = (
      <div className="table-container">
        <div className="table-control">
          <Link to="/new" className="table-adduser">
            Add User
          </Link>
        </div>

        <table className="w-full bg-[#181818]">
          <thead className="table-header">
            <tr className="">
              <th>Full Name</th>
              <th>Contact No.</th>
              <th>Role</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-body">{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return content;
};
export default UsersList;
