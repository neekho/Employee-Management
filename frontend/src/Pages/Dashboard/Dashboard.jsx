import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../auth/authApiSlice.js'

// Layouts
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

// Components
import EmployeeCard from "../../Components/EmployeeCard/EmployeeCard.jsx";



import "./Dashboard.css";


const DASHBOARD_REGEX = /^\/dashboard(\/)?$/
const EMPLOYEES_REGEX = /^\/dashboard\/employees(\/)?$/

const Dashboard = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
      isLoading,
      isSuccess,
      isError,
      error
  }] = useSendLogoutMutation()

  useEffect(() => {
      if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  // let dashClass = null
  if (!DASHBOARD_REGEX.test(pathname)) {
      console.log("you are not in the dashboard")
  }

  const logoutButton = (
    <button
        className="table-adduser"
        title="Logout"
        onClick={sendLogout}
    >
        <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )




  const content =  (
    <AuthenticatedLayout>
      <div className="table-container">
        <div className="table-control">
          <Link to="/new" className="table-adduser">
            Add User
          </Link>

          {logoutButton}
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
          <tbody className="table-body">
            {}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );

  return content;
};

export default Dashboard;
