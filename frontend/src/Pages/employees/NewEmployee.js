import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewEmployee = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const [hide, setHide] = useState(true);

  const toggleVisibility = () => {
    setHide((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="signup-page">
      <div className="signup-heading ">
        <h1 className="">Create an employee</h1>

        <form action="" className="signup-form">
          <label className="mt-4" htmlFor="Firstname">
            Firstname
          </label>
          <input
            id="firstname"
            type="text"
            name="Firstname"
            placeholder="Enter first name"
            autoComplete="off"
          />
          <label className="mt-4" htmlFor="Lastname">
            Lastname
          </label>
          <input
            id="lastname"
            type="text"
            name="Lastname"
            placeholder="Enter last name"
            autoComplete="off"
          />
          <label className="mt-4" htmlFor="contactNo">
            Email
          </label>
          <input
            id="contactNo"
            type="number"
            name="contactNo"
            placeholder="Enter contact number"
            autoComplete="off"
          />

          <label className="mt-4" htmlFor="role">
            Role
          </label>
          <input
            id="role"
            type="text"
            name="role"
            placeholder="Enter role"
            autoComplete="off"
          />

          <label className="mt-4" htmlFor="department">
            Department
          </label>
          <input
            id="department"
            type="text"
            name="department"
            placeholder="Enter department"
            autoComplete="off"
          />

          <button className="submit" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEmployee;
