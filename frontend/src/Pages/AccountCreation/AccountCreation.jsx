import React, { useState } from "react";
import { Link } from "react-router-dom";

// Layout
import GuestLayout from "../../Layouts/GuestLayout";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// CSS
import "../AdminRegister/AdminRegister.css";

const AccountCreation = () => {
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
          <h1 className="">Get's Started.</h1>
          <p>
            Already have an account?
            <Link to="/login" className="ms-1 text-violet-500">
              Login Here!
            </Link>
          </p>

          <form action="" className="signup-form">
            <label className="mt-4" htmlFor="Email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="Email"
              placeholder="Enter email"
              autoComplete="off"
            />

            <label className="mt-4" htmlFor="Role">
              Role
            </label>
            <input
              id="role"
              type="text"
              name="Role"
              placeholder="Enter role"
              autoComplete="off"
            />

            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={hide ? "password" : "text"}
                name="password"
                placeholder="Enter your password"
                autoComplete="off"
              />

              <FontAwesomeIcon
                className="absolute top-0 right-0 p-3 text-xl text-violet-500"
                icon={hide ? faEyeSlash : faEye}
                onClick={toggleVisibility}
              />
            </div>
            <label htmlFor="retype_password">Retype Password</label>
            <div className="relative">
              <input
                id="retype_password"
                type={hide ? "password" : "text"}
                name="retype_password"
                placeholder="Enter your password"
                autoComplete="off"
              />

              <FontAwesomeIcon
                className="absolute top-0 right-0 p-3 text-xl text-violet-500"
                icon={hide ? faEyeSlash : faEye}
                onClick={toggleVisibility}
              />
            </div>
            <button className="submit" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default AccountCreation;
