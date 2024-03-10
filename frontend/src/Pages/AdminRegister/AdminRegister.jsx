import React, { useState } from "react";
import GuestLayout from "../../Layouts/GuestLayout";

import "./AdminRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AdminRegister = () => {
  const [hide, setHide] = useState(true);

  const toggleVisibility = () => {
    setHide((prevState) => {
      return !prevState;
    });
  };

  return (
    <GuestLayout>
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
            <label className="mt-4" htmlFor="contact">
              Contact Number
            </label>
            <input
              id="contact"
              type="number"
              name="contact"
              placeholder="Enter contact number"
              autoComplete="off"
            />

            <label className="mt-4" htmlFor="position">
              Position
            </label>
            <input
              id="position"
              type="text"
              name="position"
              placeholder="Enter employee role"
              autoComplete="off"
            />

            <label className="mt-4" htmlFor="department">
              Department
            </label>
            <input
              id="department"
              type="text"
              name="department"
              placeholder="Enter employee department"
              autoComplete="off"
            />

            <button className="submit" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default AdminRegister;
